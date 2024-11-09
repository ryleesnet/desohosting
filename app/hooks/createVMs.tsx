"use server"

import { vmConfig, serverType } from "../types";
import fs from 'fs';


export default async function CreateVMs (serverInfo: serverType, payment_plan: string, last_payment_hex: string, pkey: string, username: string, vmHostname: string) { 
    let nextAvailableId = 501;

    const baseAPI = "https://pve01.home.rylees.net/api2/json/nodes/pve01/qemu"
   
    try {
        const response = await fetch(baseAPI, {
            method: 'GET',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
               
            }
        });

        const resJson = await response.json();
        const sortedVMIds = resJson.data  
  .map((vm: vmConfig) => vm.vmid) 
  .filter((vmid: number) => vmid >= 501 && vmid <=900) 
  .sort((a: number, b: number) => a - b);
    
    for (const vmId of sortedVMIds) {
      if (vmId !== nextAvailableId) {
        break;
      }
      nextAvailableId++;
    }
  



} catch (error) {
    console.error("Error:", error);
}

async function processIpAddresses() {
    try {
      // Read the IP addresses from the file
      const data = await fs.promises.readFile('ip_addresses.txt', 'utf-8');
      const ipAddresses = data.split('\n').filter(ip => ip.trim());
  
      // Extract the first IP and create a new array
      const nextIP = ipAddresses[0];
      const remainingIps = ipAddresses.slice(1);
  
      // Write the first IP to a file
      

      // Write the remaining IPs back to the original file
      await fs.promises.writeFile('ip_addresses.txt', remainingIps.join('\n'));
  
      console.log('First IP:', nextIP);
      console.log('Remaining IPs:', remainingIps);
      return nextIP
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
const IP_ADDRESSES = await processIpAddresses()
const ipconfig = "gw=107.131.170.206,ip=" + IP_ADDRESSES + "/28"
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-indexed
const day = currentDate.getDate();
const formattedDate = `${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${year}`;
const tagsInfo = formattedDate + ";" + pkey

const createVMdata = {
    vmid: nextAvailableId,
    node: "pve01",
    name: vmHostname,
    description: pkey + "/" + serverInfo?.name + "/" + payment_plan + ": " + last_payment_hex,
    tags: tagsInfo,
    cores: serverInfo.vcpu,
    memory: (serverInfo.memory * 1024)
    };
    
const configData = {
    cipassword: "Testing123!",
    ciuser: username,
    net0: "model=virtio,bridge=vmbr1",
    ipconfig0: ipconfig,
    virtio0: "zfs_01:0,import-from=zfs_01:vm-901-disk-0",
    sata0: "file=zfs_01:cloudinit,media=cdrom",
    boot: "order=virtio0",
    agent: "enabled=true,freeze-fs-on-backup=true,fstrim_cloned_disks=true,type=virtio"
    }

const delay = (ms: number)  => new Promise(res => setTimeout(res, ms));

try {
    const response = await fetch(baseAPI, {
        method: 'POST',
        headers: {
            Authorization: String(process.env.PVE_TOKEN),
            'Content-Type': 'application/json'         
            },
        body: JSON.stringify(createVMdata)
        });

    const resJson = await response.json();
        //console.log(resJson);
    } catch (error) {
        console.error("Error:", error);
    }

try {
    await delay(25000);
    const response = await fetch(baseAPI + "/" + nextAvailableId + "/config", {
        method: 'POST',
        headers: {
            Authorization: String(process.env.PVE_TOKEN),
            'Content-Type': 'application/json'
            
        },
        body: JSON.stringify(configData)
    });

    const resJson = await response.json();
        
    } catch (error) {
        console.error("Error:", error);
    }

    const diskResize = {
        disk: "virtio0",
        size: serverInfo.ssd + "G"
    }

    try {
        const response = await fetch(baseAPI + "/" + nextAvailableId + "/resize", {
            method: 'PUT',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify(diskResize)
        });

        const resJson = await response.json();
        await delay(10000);
    } catch (error) {
        console.error("Error:", error);
    }

}
