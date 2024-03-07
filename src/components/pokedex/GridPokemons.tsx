"use client"


import { PokemonCard, Spinner } from "@/components"
import { useEffect, useState } from "react"
import { CustomPokemon, Pokemons, Result } from "@/interfaces"
import { MdOutlineCatchingPokemon } from "react-icons/md"
import { getPokemonsPaginated, getSearchedPokemonsInfo } from "@/actions"


interface Props {
    query: string,
    allPokmns?: Pokemons
}


export const GridPokemons = ({ query, allPokmns }: Props) => {

    const [pokemons, setPokmons] = useState<CustomPokemon[]>([])
    const [counter, setcounter] = useState(1)
    const [principalLoading, setPrincipalLoading] = useState(true) // Para mostrar el loading al principio
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [searchedPokemons, setSearchedPokemons] = useState<CustomPokemon[]>([])


    // Para la busquedas
    useEffect(() => {
        if (query.length === 0) {
            setSearchedPokemons([])
        }
        else if (query.length >= 2) {
            const pokemons = allPokmns?.results.filter(pok => pok.name.includes(query))
            const searchedPokemonsInfo = async () => {
                const pokmns = await getSearchedPokemonsInfo(pokemons as Result[])
                setSearchedPokemons(pokmns)
            }
            searchedPokemonsInfo()
        }
    }, [query])


    // Para mostrar los pokemons al principio
    useEffect(() => {
        const laodPokemons = async () => {
            const pokmns = await getPokemonsPaginated(counter)
            if (counter === 1) {
                setPokmons(pokmns);
                setLoaded(true)
                setPrincipalLoading(false)
            } else {
                setPokmons((oldPokemons) => [...oldPokemons, ...pokmns]);
                setLoading(!loading)
            }
        }
        laodPokemons()

    }, [counter])



    const handleClicked = () => {
        setLoading(!loading)
        setcounter((prevCounter) => prevCounter + 1)
        setClicked(!clicked)
    }


    return (
        <>
            {
                (!principalLoading)
                    ? (
                        <>
                            {
                                (searchedPokemons.length === 0)
                                    ? // Mostrar todos los pokemons 
                                    (query.length > 0)

                                        ? // Busqueda -> Si se ha hecho una busqeuda de un pokemon que NO existe, se muestra este mensaje
                                        <div className="px-8 md:px-4 text-center h-[400px] flex items-center">
                                            <p className="md:text-xl text-lg">Ooops, parece que <span className="font-bold text-blue-500">no</span> hay coincidencias...</p>
                                        </div>
                                        : // Base -> Si el input de la búsqueda está vacío, se muestra TODOS los pokemons
                                        <>
                                            <div
                                                className="flex max-w-[85rem] justify-center flex-wrap gap-5 xl:gap-10">
                                                {pokemons?.map((pok) => (
                                                    <PokemonCard key={pok.id} pokmn={pok} />

                                                ))}
                                            </div>
                                            {/* ---- Btn Cargar más ---- */}
                                            <div className="w-full mt-10 flex justify-center">
                                                {
                                                    // 10 -> porque hay 9 generaciones
                                                    // loaded -> hace que el btn NO se muestre hasta que se muestren las tarjetas
                                                    (loaded && counter < 9) &&
                                                    //  ---- Button ----
                                                    <>
                                                        {
                                                            (loading)
                                                                ? <Spinner />
                                                                : (
                                                                    <button
                                                                        onClick={handleClicked}
                                                                        className={`mx-auto px-4 py-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white dark:bg-[#162946] dark:hover:bg-[#273c5c] dark:text-[#a8b4d3]`}
                                                                    >
                                                                        <span>Mas Pokemons</span>
                                                                        <MdOutlineCatchingPokemon className="w-4 h-4" />
                                                                    </button>)
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </>
                                    : // Busqueda -> Mostar Pokemons de Busqueda
                                    <div
                                        className="flex max-w-[85rem] justify-center flex-wrap gap-5 xl:gap-10">
                                        {searchedPokemons?.map((pok) => (
                                            <PokemonCard key={pok.id} pokmn={pok} />
                                        ))}
                                    </div>
                            }
                        </>
                    )
                    : (
                        <Spinner />
                    )
            }
        </>
    )
}
