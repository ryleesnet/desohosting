import { useUser } from "@/app/context/user";
import { avatarUrl } from "@/app/deso/deso-api";
import { FcPicture } from "react-icons/fc";
import { HiServerStack } from "react-icons/hi2";
import { RiTokenSwapLine } from "react-icons/ri";
import { FaMemory } from "react-icons/fa";
import { FiCpu } from "react-icons/fi";
import { RiHardDrive3Line } from "react-icons/ri";
import { arrayOfServerTypes, serverType } from "@/app/types";
import { useGeneralStore } from "@/app/stores/general";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Popup from "./Popup";
import { burnDeSoToken} from "deso-protocol";
import { useEffect, useState } from "react";


export default function ItemCard (serverInfo: serverType) {
    const {desoPriceUSD, setIsVisible, tokenPrice, setTokenPrice, setCurrency, setDesoPrice, setServerType} = useGeneralStore()
    const tokenPriceLocal = ((serverInfo.price / .01 ) / 2).toFixed(2)
    const desoPriceLocal = (serverInfo.price / (desoPriceUSD / 100 )).toFixed(2)
 

    return (
        
                desoPriceUSD > 0  ? (
                <>
                <div className="flex item-card p-4 border-slate-700 border flex-col items-center bg-slate-800 rounded-xl w-[18em] ">
                <HiServerStack className="" size="150" />
                <p className="text-xl pb-2 text-center">{serverInfo.name}</p>
                <div className="flex justify-center items-center gap-4 p-4 bg-slate-700 mb-4 rounded-xl">
                    <div className="flex flex-col items-center">
                    <FaMemory size={32} />
                    <p className="text-sm text-center">{serverInfo.memory} GB</p>
                    </div>
                    <div className="flex flex-col items-center ">
                    <FiCpu size={32} />
                    <p className="text-sm text-center">{serverInfo.vcpu} vCPU</p>
                    </div>
                    <div className="flex flex-col items-center ">
                    <RiHardDrive3Line size={32}/>
                    <p className="text-sm text-center">{serverInfo.ssd} GB</p>
                    </div>
                    </div>
                <div id="bottom" className="flex justify-between w-full pr-2 pl-2">
                
                     <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-sky-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-700 mt-4 mb-4 w-24" onClick={() => {
                            setIsVisible(true)
                            setTokenPrice(tokenPriceLocal)
                            setCurrency('token')
                            setServerType(serverInfo.name)
                            }}>
                        <span className="text-md mr-1">{Number(tokenPriceLocal).toLocaleString()}</span>
                        <RiTokenSwapLine className="" size="20" />
                        
                        </button>
                    </div>
                    <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-sky-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-700 mt-4 mb-4 w-24" onClick={() => {
                            setIsVisible(true)
                            setDesoPrice(desoPriceLocal)
                            setCurrency('deso')
                            setServerType(serverInfo.name)
                            }}>
                        <span className="text-md mr-2">{desoPriceLocal}</span>
                        <img src="../../../images/desologo.svg" className="h-6" alt=""/>
                        
                        </button>
                        
                    </div>
                </div>
            </div>
                </>
                ) : (
                <>
                <div className="flex item-card p-4 border-slate-700 border flex-col items-center bg-slate-800 rounded-xl w-[18em] h-[28em]">
                <HiServerStack className="" size="200" />
                <p className="text-2xl pb-2 text-center">{serverInfo.name}</p>
                <div className="flex justify-center items-center gap-4 p-4 bg-slate-700 mb-4 rounded-xl">
                    <div className="flex flex-col items-center">
                    <FaMemory size={32} />
                    <p className="text-lg text-center">{serverInfo.memory} GB</p>
                    </div>
                    <div className="flex flex-col items-center ">
                    <FiCpu size={32} />
                    <p className="text-lg text-center">{serverInfo.vcpu} vCPU</p>
                    </div>
                    <div className="flex flex-col items-center ">
                    <RiHardDrive3Line size={32}/>
                    <p className="text-lg text-center">{serverInfo.ssd} GB</p>
                    </div>
                    </div>
                <div id="bottom" className="flex justify-between w-full pr-2 pl-2">
                
                     <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-sky-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-700 mt-4 mb-4 w-24">
                        <span className="text-md mr-1"><AiOutlineLoading3Quarters className="animate-spin" /></span>
                        <RiTokenSwapLine className="" size="20" />
                        
                        </button>
                    </div>
                    <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-sky-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-700 mt-4 mb-4 w-24">
                        <span className="text-md mr-2 mt-1"><AiOutlineLoading3Quarters className="animate-spin" /></span>
                        <img src="../../../images/desologo.svg" className="h-6" alt=""/>
                        
                        </button>
                    </div>
                </div>
            </div>
                </>
                )

                
    
        
    
    )

}