import { Specie } from "@/interfaces"



export const getColorBySpecie = async (idPokemon: number) => {

    const urlSpecie = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`

    try {
        const color: Specie = await fetch(urlSpecie).then(resp => resp.json())
        return color.color.name
    } catch (error) {
        console.log(error)
    }
    return "red"
}