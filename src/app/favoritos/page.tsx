import { Footer, GridPokemonsFavs, NavBarFavorites, PokemonInfo } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Favoritos | Pokedex",
    description: 'Pokedex creada con Next',
    keywords: "pokemon, pokedex, Next, React, Tailwind, favoritos, PokeApi"
}


export default function HomeFavorite() {
    return (
        <main className="dark:bg-[#0a192f] flex flex-col h-screen">
            {/* Menu */}
            <NavBarFavorites />

            {/* Body */}
            {/* ---- Favoritos Title ---- */}
            <div className="w-full text-center py-5 md:py-7 xl:py-10 ">
                <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mt-5 md:mt-0 text-blue-500 dark:text-[#a8b4d3]">Favoritos</h1>
            </div>

            <div className="flex-grow">
                <GridPokemonsFavs />
            </div>

            <PokemonInfo />

            {/* ---- Footer ---- */}
            <Footer />

        </main>
    );
}