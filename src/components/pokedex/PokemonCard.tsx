"use client"

import Image from 'next/image';
import { CustomPokemon, Pokemon } from '@/interfaces'
import { capitalizePokemonName, refactorPokemonId } from '@/functions';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { motion } from "framer-motion"
import { useState } from 'react';
import { useFavStore, usePokemonInfoStore } from '@/store';



type ColorType = {
    [key: string]: {
        'bg': string;
        'text-color': string
    };
};


// Color de las tarjetas
// CardPokemon
const colors: ColorType = {
    "black": {
        "bg": "bg-[#5D5D6E]",
        "text-color": "text-[#F2F2F2]"
    },
    "blue": {
        "bg": "bg-[#81A6D1]",
        "text-color": "text-[#3C3C3C]"
    },
    "brown": {
        "bg": "bg-[#B8912F]",
        "text-color": "text-[#3C3C3C]"
    },
    "gray": {
        "bg": "bg-[#AEAEAE]",
        "text-color": "text-[#3C3C3C]"
    },
    "green": {
        "bg": "bg-[#85AB5F]",
        "text-color": "text-[#3C3C3C]"
    },
    "pink": {
        "bg": "bg-[#E59AAF]",
        "text-color": "text-[#3C3C3C]"
    },
    "purple": {
        "bg": "bg-[#AB80D1]",
        "text-color": "text-[#3C3C3C]"
    },
    "red": {
        "bg": "bg-[#E28231]",
        "text-color": "text-[#3C3C3C]"
    },
    "white": {
        "bg": "bg-[#F7F7F7]",
        "text-color": "text-[#3C3C3C]"
    },
    "yellow": {
        "bg": "bg-[#E5C84C]",
        "text-color": "text-[#3C3C3C]"
    },
}

interface Props {
    pokmn: CustomPokemon
}


export const PokemonCard = ({ pokmn }: Props) => {

    const { pokemon, color } = pokmn

    // Liked Button
    const [liked, setliked] = useState(false)

    // Zustand -> Info Pokemon
    const openInfoMenu = usePokemonInfoStore(state => state.openInfoMenu)
    const addPokemonInfo = usePokemonInfoStore(state => state.addPokemon)
    const addColorInfo = usePokemonInfoStore(state => state.addColor)


    // Zustand -> Favorited Store
    const addFavorite = useFavStore(state => state.addFavorite)
    const favStore = useFavStore(state => state.favorites)


    // Pokmn Image -> Si la oficial No está, coge una alternativa
    let srcImage = pokemon?.sprites?.other?.["official-artwork"].front_default
    if (srcImage === null) {
        srcImage = pokemon?.sprites.other?.home.front_default
    }

    // Funcion btn Favorito
    const handleLike = () => {
        setliked(!liked)
        // Añadir pokemon al store
        addFavorite(pokmn)
    }

    // Mostrar info pokemon
    const handlePokemonInfo = () => {
        openInfoMenu()
        addPokemonInfo(pokemon as Pokemon)
        addColorInfo(color)
    }


    return (
        <>
            <motion.div
                variants={
                    {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }
                }
                initial="hidden"
                animate="visible"
                transition={{
                    delay: 0.01,
                    ease: "easeInOut",
                    duration: 0.5
                }}
                viewport={{ amount: 0 }}
            >

                {/* -----  Card ----- */}
                <div
                    className={`h-[100px] w-[170px] relative md:h-[132px] md:w-[224px] xl:h-[165px] xl:w-[280px]  rounded-[10px] ${colors[color].bg} overflow-hidden shadow-xl ring-1 ring-gray-900/5 cursor-pointer transform transition-transform hover:scale-105  dark:bg-[#162946] relative `}>

                    <div
                        onClick={handlePokemonInfo}
                        className='w-full h-full absolute top-0 left-0 bg-transparent z-30' />
                    {/* Text & Heart */}
                    <div className="h-full  px-4 py-4 ">
                        <div
                            onClick={handlePokemonInfo}
                            className='z-10 cursor-pointer '>
                            <p className={`xl:text-[16px] text-[14px] md:text-[18px] dark:text-[#a8b4d3] font-bold ${colors[color]["text-color"]}`}>Nº {refactorPokemonId(pokemon?.id as number)}</p>
                            <p className={`xl:text-[24px]  text-[16px] md:text-[20px]   dark:text-[#a8b4d3] -mt-1 font-bold ${colors[color]["text-color"]}`}>{capitalizePokemonName(pokemon?.name as string)}</p>
                        </div>

                        {/* Favorited button  */}
                        <div
                            className='absolute bottom-4 left-4 z-50 hover:bg-black/5 dark:hover:bg-white/10 p-2 rounded-full'
                            onClick={handleLike}>
                            {
                                (favStore.find(fav => fav.id === pokmn.id))
                                    ? <GoHeartFill className="text-red-500 cursor-pointer  xl:w-[21px] dark:text-[#a8b4d3] dark:hover:text-[#a8b4d3] xl:h-[21px] w-[15px] h-[15px] md:w-[17px] md:h-[17px] lg:w-[19px] lg:h-[19px] justify-end" />
                                    : <GoHeart className="text-red-500 text-opacity-50  cursor-pointer  dark:text-[#a8b4d3] dark:hover:text-[#a8b4d3] xl:w-[21px] xl:h-[21px] w-[15px] h-[15px] md:w-[17px] md:h-[17px] lg:w-[19px] lg:h-[19px] justify-end" />
                            }
                        </div>
                    </div>

                    {/* ---- Image ---- */}
                    <Image
                        onClick={handlePokemonInfo}
                        width={200}
                        height={200}
                        alt=''
                        className='absolute top-2 -right-2 z-20 cursor-pointer w-[100px] md:w-[120px] md:-right-2 xl:w-[160px] xl:-right-6'
                        src={srcImage!}
                        priority={false} //Carga perezosa de imagenes
                    />
                    <Image
                        onClick={handlePokemonInfo}
                        className='absolute cursor-pointer -bottom-8 -right-8 z-0 opacity-30 xl:w-[180px] xl:h-[180px] md:w-[150px] md:h-[150px]'
                        src={"/pokeball-white.png"}
                        width={130}
                        height={130}
                        alt='Pokeball-white'
                    />
                </div>
            </motion.div>
        </>

    )
}
