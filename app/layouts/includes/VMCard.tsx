"use client"
import { useUser } from "@/app/context/user";
import { HiServerStack } from "react-icons/hi2";
import { FaNetworkWired, FaMemory } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { RiHardDrive3Line } from "react-icons/ri";
import stopVM from "@/app/hooks/stopVM";
import startVM from "@/app/hooks/startVM";
import { myCustomVMInfo, vmConfig, vmStatusCurrent } from "@/app/types";
import deleteVM from "@/app/hooks/deleteVM";

export default function VMCard (VMStatusCurrent: myCustomVMInfo) {
    const contextUser = useUser()

    const bytesToGB = (bytes: number): string => {
        const GB = bytes / (1024 ** 3); // 1 GB = 1024^3 bytes
        if (GB < 1) {
            return GB.toFixed(2); // Returns GB with 2 decimal places
        } else{
            return GB.toFixed(0); // Returns GB with 2 decimal places
        }
        
    };

    const convertNumericDateToDateObject = (numericDate: string) => {
        const month = parseInt(numericDate.slice(0, 2), 10);
        const day = parseInt(numericDate.slice(2, 4), 10);
        const year = parseInt(numericDate.slice(4), 10);
      
        return new Date(year, month, day + 1); // Month is 0-indexed
      }

    return (
        
                contextUser ? (
                <>
                <div className="flex item-card p-4 border-slate-700 border flex-col items-center bg-slate-800 rounded-xl w-[20em] ">
                <HiServerStack className={VMStatusCurrent.status === "running" ? "text-green-700" : "text-yellow-700"} size="75" />

                <p className="text-xl pb-2 text-center">{VMStatusCurrent.name}</p>
                <div className="flex flex-col p-4 bg-slate-700 mb-4 rounded-xl items-center w-full">
                    <div className="flex justify-center items-center gap-8 ">
                        <div className="flex flex-col items-center">
                        <FaMemory size={32} />
                        <p className="text-sm text-center mt-4">{bytesToGB(VMStatusCurrent.ram)} GB</p>
                        </div>
                        <div className="flex flex-col items-center">
                        <FiCpu size={32} />
                        <p className="text-sm text-center mt-4">{VMStatusCurrent.cpus} vCPU</p>
                        </div>
                        <div className="flex flex-col items-center ">
                        <RiHardDrive3Line size={32}/>
                        <p className="text-sm text-center mt-4">{bytesToGB(VMStatusCurrent.ssd_size)} GB</p>
                        </div>

                        </div>
                        <div className="flex flex-row items-center mt-4 ">
                        <FaNetworkWired size={32}/>
                        {VMStatusCurrent.ipv4 ? (
                            <p className="text-sm text-center ml-4">{VMStatusCurrent.ipv4}</p>
                        ) : (
                            <p className="text-sm text-center ml-4">Not Running</p>
                        )}
                        
                        </div>
                    </div>
                
                    
                <div id="bottom" className="flex justify-between w-full gap-2">
                
                     <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-yellow-700 text-sky-200 border rounded-md  py-[6px] hover:bg-yellow-600 mt-4 mb-4 w-32" onClick={() => {
                            if (!contextUser?.user) {
                                contextUser?.login()
                                return
                            }
                            stopVM(VMStatusCurrent)
                            
                            }}>
                        <span className="text-md mr-1">FORCE STOP</span>
                       
                        
                        </button>
                    </div>
                    <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-green-800 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-green-700 mt-4 mb-4 w-32" onClick={() => {
                            if (!contextUser?.user) {
                                contextUser?.login()
                                return
                            }
                            startVM(VMStatusCurrent)
                            }}>
                        <span className="text-md mr-2">START</span>
                        
                        
                        </button>
                        
                    </div>
                    
                </div>
                <div className="flex justify-between w-full gap-2">
                <button className="flex items-centered justify-center bg-red-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-red-800 mb-4 w-32" onClick={() => {
                            if (!contextUser?.user) {
                                contextUser?.login()
                                return
                            }
                            deleteVM(VMStatusCurrent)
                            }}>
                        <span className="text-md mr-2">DELETE</span>
                        
                        
                        </button>
                        <button className="flex items-centered justify-center bg-slate-700 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-slate-600 mb-4 w-32" onClick={() => {
                            if (!contextUser?.user) {
                                contextUser?.login()
                                return
                            }
                            //startVM(VMStatusCurrent)
                            }}>
                                <div className="flex flex-col">
                        <p className="text-md mr-2">RENEW</p>
                       
                        </div>
                        </button>
                </div>
                
                <p className="text-sky-200 text-xs mr-2">EXPIRES: {VMStatusCurrent.expiration_date}</p>
            </div>
            
                </>
                ) : null
  
    
    )

}