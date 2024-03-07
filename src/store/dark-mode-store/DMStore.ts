import { create } from 'zustand'
import { persist } from 'zustand/middleware';




interface State {
    darkMode: boolean,

    turnOnDarkMode: () => void
    turnOffDarkMode: () => void
}


export const useDarModeStore = create<State>()(
    persist(
        (set) => ({
            darkMode: false,
            turnOnDarkMode: () => set({ darkMode: true }),
            turnOffDarkMode: () => set({ darkMode: false }),
        })
        ,
        {
            name: "dark-mode"
        }
    )

)