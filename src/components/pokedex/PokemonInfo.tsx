"use client"

import Image from 'next/image';
import { usePokemonInfoStore } from "@/store"
import { refactorPokemonId } from '@/functions';
import { motion } from "framer-motion"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';


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

let paths: string[] = []

export const PokemonInfo = () => {

    const isSideMenuOpen = usePokemonInfoStore(state => state.isInfoOpen)
    const closeMenu = usePokemonInfoStore(state => state.closeInfoMenu)
    const pokemonInfo = usePokemonInfoStore(state => state.pokemon)
    const colorInfo = usePokemonInfoStore(state => state.color)

    // Necesario para que la info se cierre si el user cambia de ruta desde la url
    const pathname = usePathname()
    const [currentPathname, setcurrentPathname] = useState(pathname)



    useEffect(() => {
        closeMenu()
    }, [currentPathname])



    // Url de la imagen -> En caso de que no exista la principal coge una alternativa
    let srcImage = pokemonInfo?.sprites?.other?.["official-artwork"].front_default
    if (srcImage === null) {
        srcImage = pokemonInfo?.sprites.other?.home.front_default
    }


    return (
        <>
            {
                (isSideMenuOpen) && (
                    <>

                        {/* ---- Ventanas Blur que al clickar en ella permite cerrar el SideMenu ---- */}
                        <div className="h-screen w-screen fixed top-0 left-0 bg-black opacity-20 "></div>
                        <div
                            onClick={closeMenu}
                            className="fade-in z-10 h-screen w-screen fixed top-0 left-0 backdrop-filter backdrop-blur-sm "></div>


                        {/* ---- Principal Card ----- */}
                        <motion.div
                            className='fixed right-0 top-0 md:w-[400px] z-20 w-full  h-screen bg-white dark:bg-[#162946]  shadow-2xl transform transition-all duration-300'
                            initial={{ x: "100%" }} // Posición inicial (fuera de la pantalla a la derecha)
                            animate={{ x: 0 }} // Posición final (en el centro de la pantalla)
                            transition={{ duration: 0.1 }}
                        >

                            {/* ---- Parte de Arriba ---- */}
                            <div className={`w-full p-5 rounded-b-full md:h-[400px] h-[350px]  lg:h-[360px] shadow-md relative ${colors[colorInfo].bg}`}>

                                {/* ---- Boton de salir ---- */}
                                <button
                                    onClick={closeMenu}
                                    className='text-3xl font-bold z-20 px-4 py-2 hover:bg-slate-700 hover:bg-opacity-20 rounded-full'>X</button>

                                {/* ---- Name and Number ----  */}
                                <div className="text-center ">
                                    <p className="md:text-4xl  text-4xl font-bold capitalize">{pokemonInfo.name}</p>
                                    <p className="md:mt-3 font-semibold md:text-2xl text-xl">Nº {refactorPokemonId(pokemonInfo.id)}</p>
                                </div>

                                <Image
                                    className=" h-[300px] absolute right-14 z-50 md:-bottom-20 "
                                    src={srcImage as string}
                                    alt={pokemonInfo.name}
                                    height={300}
                                    width={300} />

                                {/* <Image
                                        className='absolute bottom-0 right-[50px] rotate-90 z-10 opacity-10'
                                         src="/pokeball-black.png" alt="pokeball-white" height={330} width={330} /> */}
                            </div>

                            {/* ---- Parte de Abajo ---- */}
                            <div className="h-full w-full ">

                                {/* ---- Tipos ---- */}
                                <div className="w-full pt-24 font-bold capitalize flex justify-center gap-4">
                                    {
                                        pokemonInfo.types.map(typ => (
                                            <div key={typ.type.name} className={`py-2  px-6 rounded-3xl w-fit ${colors[colorInfo].bg}`}>
                                                <span>{typ.type.name}</span>
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* ---- Stats ---- */}
                                <div className='mt-10'>
                                    {
                                        pokemonInfo.stats.map(stat => (
                                            <div key={stat.stat.name} className='flex w-full mt-5 px-8'>

                                                {/* ---- Stat Name ---- */}
                                                <div className='w-40  capitalize font-bold dark:text-[#a8b4d3]'>
                                                    <span>{stat.stat.name}</span>
                                                </div>

                                                <div className='flex-1  items-center flex'>
                                                    {/* ---- Barra de stat ---- */}
                                                    <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 " >
                                                        <div className={`flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap ${colors[colorInfo].bg} transition duration-500 dark:${colors[colorInfo].bg}`}
                                                            style={{ width: `${stat.base_stat}%` }}>
                                                            <span>{stat.base_stat}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* ---- Sprites ---- */}
                                <div className='w-full flex  justify-center mt-5 gap-x-5'>
                                    {
                                        (pokemonInfo.sprites.other?.showdown.front_default) &&
                                        (
                                            <>
                                                {
                                                    (pokemonInfo.sprites.back_default) && <img className='max-h-40' src={pokemonInfo.sprites.back_default} alt="gif" />
                                                }
                                                {
                                                    (pokemonInfo.sprites.front_default) && <img className='max-h-40' src={pokemonInfo.sprites.front_default} alt="gif" />
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </motion.div>
                    </>
                )
            }
        </>
    )
}
