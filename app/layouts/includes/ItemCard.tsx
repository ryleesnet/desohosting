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
import ConfirmBuy from "./ConfirmBuy";
import { ConstructBurnDeSoTokenRequestParams, DAOCoinRequest, burnDeSoToken, transferDeSoToken } from "deso-protocol";
import { TransferDAOCoinRequest, TxRequestWithOptionalFeesAndExtraData } from "deso-protocol";
import { TypeWithOptionalFeesAndExtraData } from "deso-protocol/src/types";

export default function ItemCard (serverInfo: serverType) {
    const contextUser = useUser()
    const {desoPriceUSD} = useGeneralStore()
    const tokenPrice = ((serverInfo.price / (desoPriceUSD / 100 )) / .01 ).toFixed(2)
    const desoPrice = (serverInfo.price / (desoPriceUSD / 100 )).toFixed(2)

    function buyWithTokens () {

        const tokenNanos = (Number(tokenPrice) * 1000000000000000000).toString(16)

        
        /* let data: TxRequestWithOptionalFeesAndExtraData<TransferDAOCoinRequest> = {
            SenderPublicKeyBase58Check: "BC1YLijd5XEneHzVd5VFb2mgdNkRpPneNWY6fKJ3ptBVJ5guqAnPSke",
            ProfilePublicKeyBase58CheckOrUsername: "BC1YLjVW2R9e44vjXKLST86ie6jfkyiShqPC47jUEFeBnERxG7NeUqC",
            ReceiverPublicKeyBase58CheckOrUsername: "BC1YLgHrtHzPf2ytm2wkeYzWDkXXdPiKzZnRwqSyhGpfK2drVUPUKYb",
            DAOCoinToTransferNanos: "DE0B6B3A7640000"
           
        } */

        const data: ConstructBurnDeSoTokenRequestParams = {
            UpdaterPublicKeyBase58Check: "BC1YLijd5XEneHzVd5VFb2mgdNkRpPneNWY6fKJ3ptBVJ5guqAnPSke",
            ProfilePublicKeyBase58CheckOrUsername: "BC1YLjVW2R9e44vjXKLST86ie6jfkyiShqPC47jUEFeBnERxG7NeUqC",
            CoinsToBurnNanos: "DE0B6B3A7640000",
            
        }
        
        burnDeSoToken(data).then((res => {
            console.log(res)
        }))
       /*  transferDeSoToken(data).then((res => {
            console.log(res)
        })) */
       
    }
    
    function buyWithDeSo () {
        console.log("Buy With DeSo", desoPrice)
    }


  

    return (
        
                desoPriceUSD > 0  ? (
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
                        
                        <button className="flex items-centered justify-center bg-sky-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-700 mt-4 mb-4 w-24" onClick={buyWithTokens}>
                        <span className="text-md mr-1">{tokenPrice}</span>
                        <RiTokenSwapLine className="" size="20" />
                        
                        </button>
                    </div>
                    <div className="flex items-center">
                        
                        <button className="flex items-centered justify-center bg-sky-900 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-700 mt-4 mb-4 w-24" onClick={buyWithDeSo}>
                        <span className="text-md mr-2">{desoPrice}</span>
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