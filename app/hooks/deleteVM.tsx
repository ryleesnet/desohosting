"use server"

import { myCustomVMInfo, vmStatusCurrent } from "@/app/types";

export default async function deleteVM (VMStatusCurrent: myCustomVMInfo) {
    const baseAPI = "https://pve01.home.rylees.net/api2/json/nodes/pve01/qemu"

    try {
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