
"use client"
import { RiTokenSwapLine } from "react-icons/ri";
import { useGeneralStore } from "../stores/general";
import { arrayOfServerTypes } from "../types";
import Popup from "./includes/Popup";
import { useUser } from "../context/user";
import { burnDeSoToken, identity, sendDeso, SendDeSoRequest, submitPost, SubmitPostRequestParams, TransactionSpendingLimitResponseOptions, TxRequestWithOptionalFeesAndExtraData } from "deso-protocol";
import PopupThanks from "./includes/PopupThanks";
import Link from "next/link";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import WalletBalance from "./includes/WalletBalance";
import CreateVMs from "../hooks/createVMs";
import CurrentVms from "./includes/CurrentVms";
import NewVms from "./includes/NewVms";

export default function MainContent () { 
    const setIsVisible = useGeneralStore((store) => store.setIsVisible)
    const setTokenPrice = useGeneralStore((store) => store.setTokenPrice)
    const tokenPrice = useGeneralStore((store) => store.tokenPrice)
    const desoPrice = useGeneralStore((store) => store.desoPrice)
    const setDesoPrice = useGeneralStore((store) => store.setDesoPrice)
    const currency = useGeneralStore((store) => store.currency)
    const walletBalanceDeSo = useGeneralStore((store) => store.walletBalanceDeSo)
    const walletBalanceTokens = useGeneralStore((store) => store.walletBalanceTokens)
    const searchTerm = useGeneralStore((store) => store.searchTerm)
    const serverTypeInfo = useGeneralStore((store) => store.serverTypeInfo)
    const setServerTypeInfo = useGeneralStore((store) => store.setServerTypeInfo)
    const isConfirmedVisible = useGeneralStore((store) => store.isConfirmedVisible)
    const setIsConfirmedVisible = useGeneralStore((store) => store.setIsConfirmedVisible)
    

    const contextUser = useUser()
    const walletBalanceTokensConverted = (walletBalanceTokens / 1000000000000000000 )
    const walletBalanceDesoConverted = (walletBalanceDeSo / 1000000000 )

    const data: arrayOfServerTypes = {
        
        serverInfo: [
          { name: "Mini Server", memory: 1, vcpu: 1, ssd: 32, price: 5, priceInTokens: 350 },
          { name: "S1 Server", memory: 2, vcpu: 2, ssd: 32, price: 7, priceInTokens: 350 },
          { name: "S2 Server", memory: 4, vcpu: 2, ssd: 60, price: 12, priceInTokens: 525  },
          { name: "S3 Server", memory: 8, vcpu: 4, ssd: 60, price: 24, priceInTokens: 700  },
          { name: "S4 Server", memory: 16, vcpu: 8, ssd: 60, price: 48, priceInTokens: 700  },
          //{ name: "N1 Node Server", memory: 32, vcpu: 8, ssd: 500, price: 150, priceInTokens: 875  },
          //{ name: "N2 Node Server", memory: 64, vcpu: 8, ssd: 1000, price: 250, priceInTokens: 1050  },
          //{ name: "N3 Node Server", memory: 128, vcpu: 16, ssd: 1000, price: 500, priceInTokens: 2100  }
        ]
      };

      const filteredData = data.serverInfo.filter(item => {
        const memory = item.memory.toString().includes(searchTerm); 
        const vcpu = item.vcpu.toString().includes(searchTerm); 
        const ssd = item.ssd.toString().includes(searchTerm);
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return memory || ssd || nameMatch || nameMatch;
      }
    )
    const errorLink = onError((e) => {
        //console.log(e)
        })
      
      const link = from ([
        errorLink,
        new HttpLink({ uri: "https://graphql-prod.deso.com/graphql"}),
      ]);
      
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
      })
    
      function buyWithTokens (tokens: number, payment_plan: string) {

        if (!contextUser?.user) {
            contextUser?.login()
            return
        }
        const permToCheck : Partial<TransactionSpendingLimitResponseOptions> = {
            DAOCoinOperationLimitMap: {
                'BC1YLin6CLZ52Jy7ak9BEjBQVHhSi3wNSVxc31FNeBKVKQsd9QEXTej': {
                  'burn' : 'UNLIMITED'
                }
        }
    }
        
        if (identity.hasPermissions(permToCheck)) {

            const tokensToBurn = "0x" + (tokens * 1e18).toString(16)


        const data = {
			"UpdaterPublicKeyBase58Check": String(localStorage.getItem("desoActivePublicKey")),
			"ProfilePublicKeyBase58CheckOrUsername": "BC1YLin6CLZ52Jy7ak9BEjBQVHhSi3wNSVxc31FNeBKVKQsd9QEXTej",
			"CoinsToBurnNanos": tokensToBurn,
		}

        const options = {
            txLimitCount: 1
        }

        
       
		burnDeSoToken(data, options).then(res => {
            const postdata: SubmitPostRequestParams = {
                UpdaterPublicKeyBase58Check: String(localStorage.getItem("desoActivePublicKey")),
                ParentStakeID: 'b737dc7c74369ea7cc25bce6d3b14a4608df9bde1b37af7c3ecd39dca6246fc7',
                BodyObj: {
                    Body: "@DeSoHosting - I've made a purchase!",
                    ImageURLs: null,
                    VideoURLs: null
                },
                PostExtraData: {
                    "server" : String(serverTypeInfo?.name),
                    "payment_plan" : payment_plan,
                    "last_payment_hex" : String(res.submittedTransactionResponse?.TxnHashHex)
                }

            }
            
            submitPost(postdata).then((res => {
                setIsVisible(false)
                setIsConfirmedVisible(true)
                CreateVMs(serverTypeInfo, payment_plan, String(res.submittedTransactionResponse?.TxnHashHex), String(localStorage.getItem("desoActivePublicKey")), String(contextUser.user?.Username))
            })).catch(error => {
                console.log(error)
                setIsVisible(false)
            })
			
		}).catch(error => {
            console.log(error)
            setIsVisible(false)
        })
    }
        }
        
        
    
    function buyWithDeSo (desoAmount: number, payment_plan: string) {
        if (!contextUser?.user) {
            contextUser?.login()
            return
        }

        const desoNanosToSend = desoAmount * 1e9 
        const data: TxRequestWithOptionalFeesAndExtraData<SendDeSoRequest> = {
            SenderPublicKeyBase58Check: String(contextUser?.user?.PublicKeyBase58Check),
            RecipientPublicKeyOrUsername: "BC1YLin6CLZ52Jy7ak9BEjBQVHhSi3wNSVxc31FNeBKVKQsd9QEXTej",
            AmountNanos: desoNanosToSend
        }
        
        sendDeso(data).then((res => {
            const postdata: SubmitPostRequestParams = {
                UpdaterPublicKeyBase58Check: String(contextUser?.user?.PublicKeyBase58Check),
                ParentStakeID: 'b737dc7c74369ea7cc25bce6d3b14a4608df9bde1b37af7c3ecd39dca6246fc7',
                BodyObj: {
                    Body: "@DeSoHosting - I've made a purchase!",
                    ImageURLs: null,
                    VideoURLs: null
                },
                PostExtraData: {
                    "server" : String(serverTypeInfo?.name),
                    "payment_plan" : payment_plan,
                    "last_payment_hex" : String(res.submittedTransactionResponse?.TxnHashHex)
                }

            }
            
            submitPost(postdata).then((res => {
                
            })).catch(error => {
                console.log(error)
                setIsVisible(false)
            })
        })).catch(error => {
            console.log(error)
            setIsVisible(false)
        }) 
    }
    
   
   

    return(
        <>
        <ApolloProvider client={client}>
        <WalletBalance/>
        <Popup>
         <div className="flex flex-col">   
                 <button className="m-2 p-2 rounded-xl bg-slate-700 text-sky-200 disabled:bg-gray-400 disabled:text-red-700" disabled={currency === 'token' ? walletBalanceTokensConverted < Number(tokenPrice) : walletBalanceDesoConverted < Number(desoPrice)} onClick={() => currency === 'token' ? buyWithTokens(Number(tokenPrice), "Tokens - Monthly"): buyWithDeSo(Number(desoPrice), "DeSo - Monthly")}>
                     <div className="flex flex-col items-center">
                         <div className="w-full">1 Month </div>
                         <div className="flex items-center">
                             {currency === 'token' ? (
                                 <>
                                 <div>{Number((tokenPrice)).toLocaleString()} </div>
                                 <RiTokenSwapLine className="ml-1" size="20" />
                                 </>) : (<>
                                     <div>{Number(desoPrice).toFixed(2)} </div>
                                     <img src="../../../images/desologo.svg" className="h-6 ml-1" alt=""/>
                                 </>)}
                             
                         </div>
                         
                     </div>
                     </button>
                     <button className="m-2 p-2 rounded-xl bg-slate-700 text-sky-200 disabled:bg-gray-400 disabled:text-red-700" disabled={currency === 'token' ? walletBalanceTokensConverted < Number(tokenPrice)*3 : walletBalanceDesoConverted < Number(desoPrice)} onClick={() => currency === 'token' ? buyWithTokens(Number(tokenPrice)*3, "Tokens - Every 3 Months"): buyWithDeSo(Number(tokenPrice)*3, "DeSo - Every 3 Months")}>
                     <div className="flex flex-col items-center">
                         <div className="w-full">3 Months </div>
                         <div className="flex items-center">
                         {currency === 'token' ? (
                                 <>
                                 <div>{(Number(tokenPrice) * 3).toLocaleString()} </div>
                                 <RiTokenSwapLine className="ml-1" size="20" />
                                 </>) : (<>
                                     <div>{(Number(desoPrice) * 3).toFixed(2)} </div>
                                     <img src="../../../images/desologo.svg" className="h-6 ml-1" alt=""/>
                                 </>)}
                         </div>
                     </div>
                     </button>
                     <button className="m-2 p-2 rounded-xl bg-slate-700 text-sky-200 disabled:bg-gray-400 disabled:text-red-700" disabled={currency === 'token' ? walletBalanceTokensConverted < Number(tokenPrice)*6 : walletBalanceDesoConverted < Number(desoPrice)} onClick={() => currency === 'token' ? buyWithTokens(Number(tokenPrice)*6, "Tokens - Every 6 Months"): buyWithDeSo(Number(tokenPrice)*6, "DeSo - Every 6 Months")}>
                     <div className="flex flex-col items-center">
                         <div>6 Months </div>
                         <div className="flex items-center">
                         {currency === 'token' ? (
                                 <>
                                 <div>{(Number(tokenPrice) * 6).toLocaleString()} </div>
                                 <RiTokenSwapLine className="ml-1" size="20" />
                                 </>) : (<>
                                     <div>{(Number(desoPrice) * 6).toFixed(2)} </div>
                                     <img src="../../../images/desologo.svg" className="h-6 ml-1" alt=""/>
                                 </>)}
                         </div>
                     </div>
                     </button>
                     <button className="m-2 p-2 rounded-xl bg-slate-700 text-sky-200 disabled:bg-gray-400 disabled:text-red-700" disabled={currency === 'token' ? walletBalanceTokensConverted < Number(tokenPrice)*12 : walletBalanceDesoConverted < Number(desoPrice)} onClick={() => currency === 'token' ? buyWithTokens(Number(tokenPrice)*12, "Tokens - Yearly"): buyWithDeSo(Number(tokenPrice)*12, "DeSo - Yearly")}>
                     <div className="flex flex-col items-center">
                         <div>1 Year </div>
                         <div className="flex items-center">
                         {currency === 'token' ? (
                                 <>
                                 <div>{(Number(tokenPrice) * 12).toLocaleString()} </div>
                                 <RiTokenSwapLine className="ml-1" size="20" />
                                 </>) : (<>
                                     <div>{(Number(desoPrice) * 12).toFixed(2)} </div>
                                     <img src="../../../images/desologo.svg" className="h-6 ml-1" alt=""/>
                                 </>)}
                         </div>
                     </div>
                     </button>
                 <button className="m-2 p-2 rounded-xl bg-red-800 text-sky-200" onClick={() => {
                     
                     setIsVisible(false)
                     setTokenPrice('')
                     setDesoPrice('')
                     }}> Cancel</button>
         </div>
                      
     </Popup>
     <PopupThanks>
                <>
                <div className="flex flex-col items-center">
                    <div className="flex mb-4 text-center">
                        <div>
                        Thanks for using DeSoHosting! You will be contacted via Direct Message in DeSo with ssh credentials soon! If you have any questions please reach out to
                        <Link className="ml-0.5" href="https://desocialworld.com/u/DeSoHosting"> @DeSoHosting</Link> or
                        <Link className="ml-0.5" href="https://desocialworld.com/u/ryleesnet">@ryleesnet</Link></div>
                            
                            
                        </div>
                    
                    <button className="bg-slate-900 text-sky-200 p-2 pl-4 pr-4 rounded-xl" onClick={() => {setIsConfirmedVisible(false)}}>OK</button>
                </div>
                </>
            </PopupThanks>
            <CurrentVms />
        <NewVms />
        </ApolloProvider>
     </>
    )

}