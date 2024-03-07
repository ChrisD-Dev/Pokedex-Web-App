import { CustomPokemon, Pokemon, Pokemons, Result, Specie } from "@/interfaces"



interface PokemonByGen {
    [gen: number]: {
        limit: number,
        offset: number
    }
}


const pokmnsByGen: PokemonByGen = {
    1: {
        limit: 151,
        offset: 0
    },
    2: {
        limit: 100,
        offset: 151
    },
    3: {
        limit: 135,
        offset: 251
    },
    4: {
        limit: 107,
        offset: 386
    },
    5: {
        limit: 155,
        offset: 494
    },
    6: {
        limit: 72,
        offset: 649
    },
    7: {
        limit: 88,
        offset: 721
    },
    8: {
        limit: 89,
        offset: 809
    },
    9: {
        limit: 118,
        offset: 905
    },
}


// Principal
// Devuelve una cantidad limitada de pokemons
export const getPokemonsPaginated = async (generation: number = 1): Promise<CustomPokemon[]> => {

    const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokmnsByGen[generation].limit}&offset=${pokmnsByGen[generation].offset}`

    try {
        const data: Pokemons = await fetch(url).then(resp => resp.json())

        const pokemons: CustomPokemon[] = await Promise.all(data.results.map(async (pok) => {
            const pokemonID = Number(pok.url.split('/').at(-2)) as number
            const [pokemon, color] = await Promise.all([
                getPokemonById(pokemonID),
                getColorBySpecie(pokemonID),
            ]);

            return {
                id: pokemonID,
                pokemon: pokemon,
                color: color,
            };
        }))
        return pokemons

    } catch (error) {
        console.log(error)
    }
    return []
}

// Principal
// Devuelve todos los pokemons que existe en la API
export const getAllPokemons = async (): Promise<Pokemons | undefined> => {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=1025"

    try {
        const data: Pokemons = await fetch(URL).then(resp => resp.json())
        return data

    } catch (error) {
        console.log(error)
    }
    return undefined
}


export const getSearchedPokemonsInfo = async (data: Result[]): Promise<CustomPokemon[]> => {
    try {
        const pokemons: CustomPokemon[] = await Promise.all(data.map(async (pok) => {
            const pokemonID = Number(pok.url.split('/').at(-2)) as number

            const [pokemon, color] = await Promise.all([
                getPokemonById(pokemonID),
                getColorBySpecie(pokemonID),
            ]);
            return {
                id: pokemonID,
                pokemon: pokemon,
                color: color,
            };
        }))
        return pokemons

    } catch (error) {
        console.log(error)
    }
    return []
}

// Complementaria
// Funcion  para obtener info de pokemon mediante su ID
const getPokemonById = async (pokemonId: number): Promise<Pokemon | undefined> => {
    try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then(resp => resp.json())
        return pokemon
    } catch (error) {
        console.log(error)
    }
}

// Complementaria
//Funcion  para obtener el color de la especie mediante su ID
const getColorBySpecie = async (idPokemon: number) => {

    const urlSpecie = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`

    try {
        const color: Specie = await fetch(urlSpecie).then(resp => resp.json())
        return color.color.name
    } catch (error) {
        console.log(error)
    }
    return "red"
}