import { CustomPokemon } from "@/interfaces";
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface State {
    favorites: CustomPokemon[],
    addFavorite: (pokmn: CustomPokemon) => void
}

export const useFavStore = create<State>()(
    // persist -> hacemos que la info se almacene en el localStorage
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (pokm: CustomPokemon) => {
                let favs = get().favorites

                //Revisar si el pokemon existe en la lista de favoritos
                const existPokemon = favs.some(
                    (favorited) => favorited.id === pokm.id
                )

                if (!existPokemon) {
                    set({ favorites: [...favs, pokm] })
                    return
                }

                favs = favs.filter(favorited => favorited.id !== pokm.id)

                set({ favorites: [...favs] })
            }
        })
        ,
        {
            name: "favorited-pokemons"
        }
    )
)


