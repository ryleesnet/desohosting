import {create} from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { getMiddlewareRouteMatcher } from 'next/dist/shared/lib/router/utils/middleware-route-matcher';
import { useLocalStorage } from '../hooks/useLocalStorage';

const {setItem, getItem} = useLocalStorage('pendingUploads')

interface GeneralStore {
    isLoginOpen: boolean,
    isGiveDiamondsOpen: boolean,
    isEditProfileOpen: boolean,
    areCommentsOpen: boolean,
    clickedPostIdComments: string,
    desoPriceUSD: number,
    isVisible: boolean,
    tokenPrice: string,
    desoPrice: string,
    currency: string,
    walletBalanceTokens: number,
    walletBalanceDeSo: number,
    searchTerm: string,
    serverType: string,
    isConfirmedVisible: boolean,


    setIsLoginOpen: (val: boolean) => void,
    setIsGiveDiamondsOpen: (val: boolean) => void,
    setIsEditProfileOpen: (val: boolean) => void,
    setAreCommentsOpen: (val: boolean) => void,
    setclickedPostIdComments: (val: string) => void,
    setDesoPriceUSD: (val: number) => void,
    setIsVisible: (val: boolean) => void,
    setTokenPrice: (val: string) => void,
    setDesoPrice: (val: string) => void,
    setCurrency: (val: string) => void,
    setWalletBalanceTokens: (val: number) => void,
    setWalletBalanceDeSo: (val: number) => void,
    setSearchTerm: (val: string) => void,
    setServerType: (val: string) => void,
    setIsConfirmedVisible: (val: boolean) => void,
}

export const useGeneralStore = create<GeneralStore>()(
    devtools(
        persist(
            (set) => ({
                isLoginOpen: false,
                isGiveDiamondsOpen: false,
                isEditProfileOpen: false,
                randomUsers: [],
                areCommentsOpen: false,
                clickedPostIdComments: '',
                pendingPosts: [],
                desoPriceUSD: 0,
                isVisible: false,
                isConfirmedVisible: false,
                tokenPrice: '',
                desoPrice: '',
                currency: '',
                walletBalanceTokens: 0,
                walletBalanceDeSo: 0,
                searchTerm: '',
                serverType: '',

                setIsLoginOpen: (val: boolean) => set({ isLoginOpen: val }),
                setIsGiveDiamondsOpen: (val: boolean) => set({ isGiveDiamondsOpen: val }),
                setIsEditProfileOpen: (val: boolean) => set({ isEditProfileOpen: val }),
                setAreCommentsOpen: (val: boolean) => set({ areCommentsOpen: val }),
                setclickedPostIdComments: (val: string) => set({ clickedPostIdComments: val }),
                setDesoPriceUSD: (val:number) => set({ desoPriceUSD: val}),
                setIsVisible: (val: boolean) => set({ isVisible: val}),
                setTokenPrice: (val: string) => set({ tokenPrice: val}),
                setDesoPrice: (val: string) => set({ desoPrice: val}),
                setCurrency: (val: string) => set ({ currency: val}),
                setWalletBalanceTokens: (val: number) => set ({ walletBalanceTokens: val}),
                setWalletBalanceDeSo: (val: number) => set ({ walletBalanceDeSo: val}),
                setSearchTerm: (val: string) => set({ searchTerm: val}),
                setServerType: (val: string) => set({ serverType: val}),
                setIsConfirmedVisible: (val: boolean) => set({ isConfirmedVisible: val}),
                }),
                
                
          
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)