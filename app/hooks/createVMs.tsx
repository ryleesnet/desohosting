"use server"

import { vmConfig, serverType } from "../types";

export default async function CreateVMs (serverInfo: serverType, payment_plan: string, last_payment_hex: string, pkey: string, username: string) { 

    let newVMID = 501

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
        const sortedVMs = resJson.data
        .map((vm: vmConfig) => vm.vmid)  // Extract the vmid
        .filter((vmid: number) => vmid >= 501)  // Filter IDs greater or equal to 501
        .sort((a: vmConfig, b: vmConfig) => a.vmid - b.vmid);  // Sort in ascending order

    // Now find the first available VM ID by checking for gaps
    for (let i = 0; i < sortedVMs.length; i++) {
        if (sortedVMs[i] !== newVMID) {
            // If we find a gap, break out of the loop and use that newVMID
            break;
        }
        // If there's no gap, move to the next number in sequence
        newVMID += 1;
    }
} catch (error) {
    console.error("Error:", error);
}

const currentDate = new Date();

const tagsInfo = currentDate.toLocaleDateString().replace(/\//g, "") + ";" + pkey



    const createVMdata = {
        vmid: newVMID,
        node: "pve01",
        name: username,
        description: pkey + "/" + serverInfo?.name + "/" + payment_plan + ": " + last_payment_hex,
        tags: tagsInfo,
        cores: serverInfo.vcpu,
        memory: (serverInfo.memory * 1024)

    };
    const configData = {
        cipassword: "Testing123!",
        ciuser: username,
        net0: "model=virtio,bridge=vmbr1",
        ipconfig0: "gw=104.2.4.206,ip=104.2.4.204/29",
        virtio0: "zfs_01:0,import-from=zfs_01:vm-901-disk-0",
        sata0: "file=zfs_01:cloudinit,media=cdrom",
        boot: "order=virtio0"
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
        console.log(resJson);
    } catch (error) {
        console.error("Error:", error);
    }

    try {
        await delay(20000);
        const response = await fetch(baseAPI + "/" + newVMID + "/config", {
            method: 'POST',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify(configData)
        });

        const resJson = await response.json();
        console.log(resJson);
    } catch (error) {
        console.error("Error:", error);
    }

    const diskResize = {
        disk: "virtio0",
        size: "32G"
    }

    try {
        const response = await fetch(baseAPI + "/" + newVMID + "/resize", {
            method: 'PUT',
            headers: {
                Authorization: String(process.env.PVE_TOKEN),
                'Content-Type': 'application/json'
               
            },
            body: JSON.stringify(diskResize)
        });

        const resJson = await response.json();
        console.log(resJson);
    } catch (error) {
        console.error("Error:", error);
    }

}
