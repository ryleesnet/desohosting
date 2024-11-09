import {create} from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { serverType } from '../types';

interface GeneralStore {
    desoPriceUSD: number,
    isVisible: boolean,
    tokenPrice: string,
    desoPrice: string,
    currency: string,
    walletBalanceTokens: number,
    walletBalanceDeSo: number,
    searchTerm: string,
    isConfirmedVisible: boolean,
    serverTypeInfo: serverType,
    loggedin: boolean

    setDesoPriceUSD: (val: number) => void,
    setIsVisible: (val: boolean) => void,
    setTokenPrice: (val: string) => void,
    setDesoPrice: (val: string) => void,
    setCurrency: (val: string) => void,
    setWalletBalanceTokens: (val: number) => void,
    setWalletBalanceDeSo: (val: number) => void,
    setSearchTerm: (val: string) => void,
    setIsConfirmedVisible: (val: boolean) => void,
    setServerTypeInfo: (val: serverType) => void,
    setLoggedin: (val: boolean) => void
}

export const useGeneralStore = create<GeneralStore>()(
    devtools(
        persist(
            (set) => ({
                desoPriceUSD: 0,
                isVisible: false,
                isConfirmedVisible: false,
                tokenPrice: '',
                desoPrice: '',
                currency: '',
                walletBalanceTokens: 0,
                walletBalanceDeSo: 0,
                searchTerm: '',
                serverTypeInfo: {
                    name: '',
                    memory: 0,
                    vcpu: 0,
                    ssd: 0,
                    price: 0,
                    priceInTokens: 0
                },
                loggedin: false,

                setDesoPriceUSD: (val:number) => set({ desoPriceUSD: val}),
                setIsVisible: (val: boolean) => set({ isVisible: val}),
                setTokenPrice: (val: string) => set({ tokenPrice: val}),
                setDesoPrice: (val: string) => set({ desoPrice: val}),
                setCurrency: (val: string) => set ({ currency: val}),
                setWalletBalanceTokens: (val: number) => set ({ walletBalanceTokens: val}),
                setWalletBalanceDeSo: (val: number) => set ({ walletBalanceDeSo: val}),
                setSearchTerm: (val: string) => set({ searchTerm: val}),
                setIsConfirmedVisible: (val: boolean) => set({ isConfirmedVisible: val}),
                setServerTypeInfo: (val: serverType) => set({ serverTypeInfo: val}),
                setLoggedin: (val: boolean) => set ({ loggedin: val})
                }),
                
                
          
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)