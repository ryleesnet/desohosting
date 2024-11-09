"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {BiSearch} from "react-icons/bi";
import { FiLogOut } from 'react-icons/fi';
import React, { useEffect, useState } from "react";
import { avatarUrl } from '@/app/deso/deso-api';
import { useGeneralStore } from "@/app/stores/general";
import { FaServer } from "react-icons/fa";
import { configure, getExchangeRates, identity } from "deso-protocol";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export default function TopNav () {

    const APP_NAME = 'DeSoHosting by @ryleesnet';
    const desoPriceUSD = useGeneralStore((store) => store.desoPriceUSD)
    const setDesoPriceUSD = useGeneralStore((store) => store.setDesoPriceUSD)
    let [showMenu, setShowMenu] = useState<boolean>(false)
    const setSearchTerm = useGeneralStore((store) => store.setSearchTerm)

    const handleSearchName = (event: {target: { value: string }}) => {
        setSearchTerm(event.target.value);

    }

    const loggedin = useGeneralStore((store) => store.loggedin)
    const setLoggedin = useGeneralStore((store) => store.setLoggedin)



    const desoPrice = () => {
        return getExchangeRates().then(rate => (
            setDesoPriceUSD(rate.USDCentsPerDeSoCoinbase)
            
        ))
    }

    useEffect(() => {
        desoPrice()
        if (localStorage.getItem('desoActivePublicKey')){
            setLoggedin(true)
        }
    },[])

    return (
        <>
            <div id="TopNav" className="fixed top-0 bg-slate-800 z-30 flex items-center w-full border-b border-slate-700 h-[60px]">
                <div className={`flex items-center justify-around w-full px-4 mx-auto max-w-[1150px]}`}>

                <Link className="flex items-center" href="/">
                    <FaServer className="text-2xl text-slate-400 pr-1" />
                    <p className="text-md text-slate-400">DeSoHosting</p>
                </Link>

                <div className="relative hidden md:flex items-center justify-end bg-slate-600 p-.5 rounded-full max-w-[430px] w-full">
                    <input
                        id="searchbarTxt"
                        type="text"
                        onChange={handleSearchName}
                        className="w-full pl-3 my-2 bg-transparent placeholder-sky-200 text-[15px] text-sky-200 focus:outline-none"
                        placeholder="Search"
                        />

                    <div className="px-3 py-1 flex items-center ">
                        <BiSearch className="text-sky-200" size="22" />
                    </div>
                </div>

                <div className="text-sky-200"> DeSo Price: ${desoPriceUSD ? (desoPriceUSD / 100 )  : (<><AiOutlineLoading3Quarters className="inline ml-2 animate-spin" /></>)} USD</div>

                <div className="flex items-center gap-3">
                   
                    {!loggedin ? (
                        <div className="flex items-center">
                        <button
                         className="flex items-centered bg-sky-700 text-sky-200 border rounded-md px-3 py-[6px] hover:bg-sky-800"
                         onClick={() => {
                            configure({
                                spendingLimitOptions: {
                                  GlobalDESOLimit: 1 * 1e9, // 1 Deso
                                  TransactionCountLimitMap: {
                                    BASIC_TRANSFER: 'UNLIMITED',
                                    SUBMIT_POST: 'UNLIMITED',
                                  },
                                  DAOCoinOperationLimitMap: {
                                    'BC1YLin6CLZ52Jy7ak9BEjBQVHhSi3wNSVxc31FNeBKVKQsd9QEXTej': {
                                      'burn' : 'UNLIMITED'
                                    }
                                  }
                              },
                                appName: APP_NAME,
                                nodeURI: 'https://desonode.rylees.net',
                                });
                            
                            identity.login().then((res) => {setLoggedin(true)}).catch((error) => {console.log(error)})}}
                         >
                             <span className="whitespace-nowrap mx-4 font-medium bg-transparent text-[15px]">
                                Login
                                </span>
                             </button>
 
                        </div>
                    ): (
                        <div className="flex items-center">
                            <div className="relative">
                                <button
                                onClick={() => setShowMenu(showMenu = !showMenu)}
                                className="mt-1 border border-gray-200 rounded-full"
                                >
                                    <img className="rounded-full w-[35px] h-[35px]" src={`${avatarUrl(localStorage.getItem('desoActivePublicKey'))}`} />
                                </button>
                                {showMenu ? (
                                    <div className="absolute bg-slate-800 text-slate-400 rounded-lg py-1.5 w-[200px] shadow-xl border top[40px] right-0">
                                    <button
                                        onClick={async () => {
                                            identity.logout().then((res) => {setLoggedin(false)}).catch((error) => {console.log(error)})
                                            setShowMenu(false)
                                        }}
                                        className="flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <FiLogOut size="20" />
                                        <span className="pl-2 font-semibold text-sm">Log out</span>
                                    </button>
                                    
                                </div>
                                ) : null}
                            </div>
                        </div>
                    )}

                </div>
                
                </div>
            </div>
        </>
    )
    
}