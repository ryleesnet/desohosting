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
    desoPriceUSD: number


    setIsLoginOpen: (val: boolean) => void,
    setIsGiveDiamondsOpen: (val: boolean) => void,
    setIsEditProfileOpen: (val: boolean) => void,
    setAreCommentsOpen: (val: boolean) => void,
    setclickedPostIdComments: (val: string) => void,
    setDesoPriceUSD: (val: number) => void
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

                setIsLoginOpen: (val: boolean) => set({ isLoginOpen: val }),
                setIsGiveDiamondsOpen: (val: boolean) => set({ isGiveDiamondsOpen: val }),
                setIsEditProfileOpen: (val: boolean) => set({ isEditProfileOpen: val }),
                setAreCommentsOpen: (val: boolean) => set({ areCommentsOpen: val }),
                setclickedPostIdComments: (val: string) => set({ clickedPostIdComments: val }),
                setDesoPriceUSD: (val:number) => set({ desoPriceUSD: val}),
                }),
                
                
          
            {
                name: 'store',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)