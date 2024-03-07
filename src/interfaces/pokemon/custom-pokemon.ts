import { Pokemon } from "@/interfaces"

export interface CustomPokemon {
    id: number,
    pokemon: Pokemon | undefined,
    color: string
}