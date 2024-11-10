"use server"

import { myCustomVMInfo, vmStatusCurrent } from "@/app/types";
import fs from 'fs';

export default async function deleteVM (VMStatusCurrent: myCustomVMInfo) {
    const baseAPI = "https://pve01.home.rylees.net/api2/json/nodes/pve01/qemu"

    async function processIpAddresses(ipAddressToAdd: string) {
        try {
          // Read the IP addresses from the file
          const data = await fs.promises.readFile('ip_addresses.txt', 'utf-8');
          const ipAddresses: string[] = data.split('\n').filter(ip => ip.trim());
      
          // Extract the first IP and create a new array
          //const nextIP = ipAddresses[0];
          const ipsToWrite = ipAddresses.slice(0);
          ipsToWrite.push(ipAddressToAdd)
      
          // Write the first IP to a file
          
    
          // Write the remaining IPs back to the original file
          await fs.promises.writeFile('ip_addresses.txt', ipsToWrite.join('\n'));
      
        } catch (err) {
          console.error('Error:', err);
        }
      }

    try {
        const getIPAddress = await fetch(baseAPI + "/" + VMStatusCurrent.vmid + "/config", {
            method: 'GET',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
            },
        })
        const getIPAddressJson = await getIPAddress.json();
        const ipAddressRegEx = /ip=(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
        const ipAddress = getIPAddressJson.data.ipconfig0.match(ipAddressRegEx);
        processIpAddresses(ipAddress[1])

        const response = await fetch(baseAPI + "/" + VMStatusCurrent.vmid, {
            method: 'DELETE',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
            },
            
        });
        
        const resJson = await response.json();
        

}catch (error) {
    console.error("Error:", error);
}
}