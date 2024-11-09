import {create} from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { myCustomVMInfo, vmConfig, vmStatusCurrent } from '../types';

interface VMListStore {
    
    vmListStatusCurrent: myCustomVMInfo[],
    pendingVMStatus: myCustomVMInfo | null,

    setVMListStatusCurrent: (val: myCustomVMInfo[]) => void,
    setPendingVMStatus:  (val: myCustomVMInfo | null) => void,
}

export const useVMListStore = create<VMListStore>()(
    devtools(
        persist(
            (set) => ({
                vmListStatusCurrent: [],
                pendingVMStatus: null,

                setVMListStatusCurrent: (val: myCustomVMInfo[]) => set({ vmListStatusCurrent: val}),
                setPendingVMStatus: (val: myCustomVMInfo | null) => set ({ pendingVMStatus: val})
                }),
                
                
          
            {
                name: 'vmliststore',
                storage: createJSONStorage(() => localStorage)
            }
        )
    )
)