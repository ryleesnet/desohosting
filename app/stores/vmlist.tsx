import {create} from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { myCustomVMInfo, vmConfig, vmStatusCurrent } from '../types';

interface VMListStore {
    
    vmListStatusCurrent: myCustomVMInfo[],

    setVMListStatusCurrent: (val: myCustomVMInfo[]) => void,
}

export const useVMListStore = create<VMListStore>()(
    devtools(
        persist(
            (set) => ({
                vmListStatusCurrent: [],
                setVMListStatusCurrent: (val: myCustomVMInfo[]) => set({ vmListStatusCurrent: val}),
                }),
                
                
          
            {
                name: 'vmliststore',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)