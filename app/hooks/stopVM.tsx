"use server"

import { myCustomVMInfo, vmStatusCurrent } from "@/app/types";

export default async function stopVM (VMStatusCurrent: myCustomVMInfo) {
    const baseAPI = "https://pve01.home.rylees.net/api2/json/nodes/pve01/qemu/"

    try {
        const response = await fetch(baseAPI + "/" + VMStatusCurrent.vmid + "/status/stop", {
            method: 'POST',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const resJson = await response.json();
        console.log(resJson);

}catch (error) {
    console.error("Error:", error);
}
}