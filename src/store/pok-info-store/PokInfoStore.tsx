import { Pokemon } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';




interface State {
    isInfoOpen: boolean,
    pokemon: Pokemon,
    color: string

    openInfoMenu: () => void
    closeInfoMenu: () => void
    addPokemon: (pokmn: Pokemon) => void
    addColor: (clr: string) => void
}


export const usePokemonInfoStore = create<State>()(
    persist(
        (set) => ({
            pokemon: {} as Pokemon,
            color: "",
            isInfoOpen: false,
            openInfoMenu: () => set({ isInfoOpen: true }),
            closeInfoMenu: () => set({ isInfoOpen: false }),
            addPokemon: (pokmn: Pokemon) => set({ pokemon: pokmn }),
            addColor: (clr: string) => set({ color: clr })
        })
        ,
        {
            name: "pokemon-info"
        }
    )

)

