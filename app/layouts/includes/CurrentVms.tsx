import getCurrentVMs from "@/app/hooks/getCurrentVMs"
import { useVMListStore } from "@/app/stores/vmlist"
import { useEffect } from "react"
import VMCard from "./VMCard"

export default function CurrentVms () { 

    const setVMList = useVMListStore((store) => store.setVMListStatusCurrent)
    const VMList = useVMListStore((store) => store.vmListStatusCurrent)

    useEffect(() => {
        const getVMs = () => { getCurrentVMs(String(localStorage.getItem("desoActivePublicKey"))).then((res => {
            if (JSON.stringify(res) !== JSON.stringify(VMList)) {
                setVMList(res);
            }
        })
        )}
        const intervalId = setInterval(getVMs, 10000);
        return () => clearInterval(intervalId);
    
       },[VMList])

       return (
        VMList ? (
            <>
            <div className="border border-sky-200 justify-items-center mt-4 ml-10 mr-10 bg-slate-700 rounded-xl">
            <p className="bg-slate-800 text-sky-200 text-lg p-2 w-full text-center rounded-xl">Your Servers</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 justify-items-center gap-4">
            {VMList.map((vm) => (
                <div  key={vm.vmid} className="m-2">
                    <VMCard {...vm}/>
                </div>
                
            ))
        }

            </div>

        </div>
        </>
        ) : null
        
       )

}