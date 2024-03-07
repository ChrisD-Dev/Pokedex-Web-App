import { Pokemon } from "@/interfaces"

export const getPokemonById = async (pokemonId: number): Promise<Pokemon | undefined> => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(resp => resp.json())
        return pokemon
    } catch (error) {
        console.log(error)
    }
}