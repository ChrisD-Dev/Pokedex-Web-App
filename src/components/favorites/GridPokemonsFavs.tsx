"use client"


import { NotFavoritedMessage, PokemonCard, Spinner } from "@/components"
import { CustomPokemon } from "@/interfaces"
import { useFavStore } from '@/store';
import { useEffect, useState } from "react";


const sleep = async (seconds: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000)
    })
}


export const GridPokemonsFavs = () => {

    const [loading, setLoading] = useState(true)

    const favoritedPokemons: CustomPokemon[] = useFavStore(state => state.favorites)
    const sortedFavoritedPokemons: CustomPokemon[] = favoritedPokemons.sort((a, b) => (a.id) - (b.id))


    useEffect(() => {
        const sleep1second = async () => {
            await sleep(1)
            setLoading(!loading)
        }
        sleep1second()
    }, [])



    return (
        <>
            {
                (loading && Object.keys(favoritedPokemons).length > 0)
                    ? <div className="w-full h-full flex items-center justify-center">
                        <Spinner />
                    </div>
                    : <>
                        {
                            (Object.keys(favoritedPokemons).length === 0)
                                ? <NotFavoritedMessage />
                                : (
                                    <div className="w-fit mx-auto md:mt-20 mt-5 flex-grow">
                                        <div
                                            className="flex max-w-[85rem] justify-center flex-wrap gap-5 xl:gap-10">
                                            {sortedFavoritedPokemons?.map((pok) => (
                                                <PokemonCard key={pok.id} pokmn={pok} />
                                            ))}
                                        </div>
                                    </div>)
                        }
                    </>
            }
        </>
    )
}