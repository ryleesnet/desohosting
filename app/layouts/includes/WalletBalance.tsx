"use client"

import { useUser } from "@/app/context/user";
import { GET_TOKEN_AMOUNT } from "@/app/graphql/GetWalletInfo";
import { useGeneralStore } from "@/app/stores/general";
import { WalletInfo } from "@/app/types";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";
import { RiTokenSwapLine } from "react-icons/ri";


export default function WalletBalance () { 

    const contextUser = useUser()
    const setWalletBalanceDeSo = useGeneralStore((store) => store.setWalletBalanceDeSo)
    const setWalletBalanceTokens = useGeneralStore((store) => store.setWalletBalanceTokens)
   
    const { loading, error, data } = useQuery(GET_TOKEN_AMOUNT, {
        variables: {
            "filter": {
              "isDaoCoin": {
                "equalTo": true
              },
              "holder": {
                "publicKey": {
                  "equalTo": contextUser?.user?.PublicKeyBase58Check
                }
              },
              "creatorPkid": {
                "equalTo": "BC1YLin6CLZ52Jy7ak9BEjBQVHhSi3wNSVxc31FNeBKVKQsd9QEXTej"
              }
            },
            "publicKey": contextUser?.user?.PublicKeyBase58Check
          },
      });

      useEffect(() => {
       
        if (data) {
          data.tokenBalances.nodes.map((walletinfo: WalletInfo) => {
            setWalletBalanceDeSo(data.desoBalance.balanceNanos)
            setWalletBalanceTokens(walletinfo.balanceNanos)
          })
        }
        
      },[data])
      
    return(

        data ? (
            <>
           <p className="mt-20 flex flex-col w-full text-sky-200 text-center text-xl pb-2">Wallet Balances</p>
           {data.tokenBalances.nodes.length > 0 ? (
               
                data.tokenBalances.nodes.map((walletinfo: WalletInfo) => (
                 
                  
                    <div className="flex justify-center items-center text-sky-200" key={walletinfo.balanceNanos}>
                        <RiTokenSwapLine className="" size="20" /> <span>DeSoHosting Tokens:</span>
                        <span className="ml-2 mr-2">{(walletinfo.balanceNanos / 1000000000000000000).toLocaleString()} </span>
                        <Link className="text-xs " target="_blank" href={"https://openfund.com/d/DeSoHosting"}>Buy Tokens</Link>
                    </div>
                    
                    
            
            ))
                  
           
                
                ): (
                <>
                <div className="flex justify-center items-center text-sky-200">
                        <RiTokenSwapLine className="" size="20" /> <span>DeSoHosting Tokens:</span>
                        <span className="ml-2 mr-2">{0} </span>
                        <Link className="text-xs bg-sky-500" target="_blank" href={"https://openfund.com/d/DeSoHosting"}>Buy Tokens</Link>
                    </div>
                </>
                )}
           
          
             <div className="flex justify-center items-center text-sky-200">
                  <img src="../../../images/desologo.svg" className="h-6" alt=""/>
                  <span>DeSo:</span>
                  <span className="ml-2">{data?.desoBalance?.balanceNanos / 1000000000}</span>
                  
                 </div>
           
        </>
        ) : (
            <>
            <p className="mt-20 flex flex-col w-full text-sky-200 text-center text-xl pb-2">Wallet Balances</p>
            <div className="flex justify-center items-center text-sky-200">
                        <RiTokenSwapLine className="" size="20" /> <span>DeSoHosting Tokens:</span>
                        <span className="ml-2 mr-2">{0} </span>
                        <Link className="text-xs bg-slate-700 p-1 rounded" target="_blank" href={"https://openfund.com/d/DeSoHosting"}>Buy Tokens</Link>
                    </div>
                 <div className="flex justify-center items-center text-sky-200">
                 <img src="../../../images/desologo.svg" className="h-6" alt=""/>
                 <span>DeSo:</span>
                 <span className="ml-2">{0}</span>
                 
                </div> 
                </>
        )

       
    )



}