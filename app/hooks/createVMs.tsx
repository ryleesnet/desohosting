

export default async function CreateVMs () { 


    const api = "https://pve01.home.rylees.net/api2/json/nodes/pve01/lxc/118/clone";
    const data = {
        "newid": 504,
        "node": "pve01",
        "full": true,
        "hostname": "Clone02",
        "description": "Mini Server"
    };

    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Authorization': String(process.env.PVE_TOKEN)
            },
            body: JSON.stringify(data)
        });

        const resJson = await response.json();
        console.log(resJson);
    } catch (error) {
        console.error("Error:", error);
    }

}
