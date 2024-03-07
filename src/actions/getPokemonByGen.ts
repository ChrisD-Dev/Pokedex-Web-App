import { MainRegion, PokemonsGen } from "@/interfaces"

export const getPokemonByGen = async (generation: string): Promise<MainRegion[] | undefined> => {
    try {
        const pokemons: PokemonsGen = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`).then(resp => resp.json())
        const pokemonsSorted: MainRegion[] = []

        // Creacion de array con objts personalizados
        pokemons.pokemon_species.map(pok => {
            pokemonsSorted.push({
                "name": pok.name,
                "url": pok.url,
                "id": pok.url.split('/').at(-2) as string
            })
        })

        // Ordenar el listado de pokemons de menor a mayor
        pokemonsSorted.sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));


        return pokemonsSorted

    } catch (error) {
        console.log(error)
    }
}