"use server"

import { myCustomVMInfo, vmConfig } from "../types";

export default async function getCurrentVMs(pkey: string): Promise<myCustomVMInfo[]> {
    const baseAPI = "https://pve01.home.rylees.net/api2/json/nodes/pve01/qemu";
  
    const convertStringDateToDateObject = (numericDate: string) => {
            const month = parseInt(numericDate.slice(0, 2), 10);
            const day = parseInt(numericDate.slice(2, 4), 10);
            const year = parseInt(numericDate.slice(4), 10);
        
            return new Date(year, month, day + 1); // Month is 0-indexed  
    };
  
    try {
      const response = await fetch(baseAPI, {
        method: 'GET',
        headers: {
          Authorization: String(process.env.PVE_TOKEN),
          'Content-Type': 'application/json',
        },
      });
  
      const resJson = await response.json();
  
      const filteredVMs = resJson.data
        .filter((vm: vmConfig) => (vm.tags ?? '').includes(pkey))
        .sort((a: vmConfig, b: vmConfig) => a.vmid - b.vmid);
  
      const customVMList: myCustomVMInfo[] = [];
  
      for (const vm of filteredVMs) {
        const response2 = await fetch(baseAPI + "/" + vm.vmid + "/agent/network-get-interfaces", {
          method: 'GET',
          headers: {
            Authorization: String(process.env.PVE_TOKEN),
            'Content-Type': 'application/json',
          },
        });
        const resJson2 = await response2.json();
        const allIPs = resJson2?.data?.result.find((item: { name: string; }) => item.name === 'eth0')['ip-addresses'];
        const ipv4Address = allIPs?.find((item: { [x: string]: string; }) => item['ip-address-type'] === 'ipv4')?.['ip-address'];
        const ipv6Address = allIPs?.find((item: { [x: string]: string; }) => item['ip-address-type'] === 'ipv6')?.['ip-address'];
  
        customVMList.push({
          name: vm.name,
          ram: vm.maxmem,
          cpus: vm.cpus,
          ssd_size: vm.maxdisk,
          ipv4: ipv4Address,
          ipv6: ipv6Address,
          expiration_date: (convertStringDateToDateObject(vm?.tags?.split(";")[0]).toLocaleDateString)(),
          vmid: vm.vmid,
          status: vm.status
        });
      }
  
      return customVMList;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }