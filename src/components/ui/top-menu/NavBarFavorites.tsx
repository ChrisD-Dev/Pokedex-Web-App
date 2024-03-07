import { DarkMode, SearchButton } from "@/components"
import { Favorites } from "./Favorites"
import Link from "next/link"
import { MdCatchingPokemon } from "react-icons/md"

export const NavBarFavorites = () => {
    return (
        <header className="w-full px-5">
            <nav className="max-w-[85rem] w-full mx-auto flex py-5 items-center">

                {/* Logo */}
                <div className="flex-1">
                    <Link href={"/"} >
                        <div className="flex items-center gap-x-1">
                            <span className="text-xl font-bold dark:text-[#ebebec] text-blue-500">Pokedex</span>
                            <MdCatchingPokemon className="text-blue-500 h-6 w-6" />
                        </div>
                    </Link>
                </div>

                {/* SearchButton */}
                {/* <div className="flex-1 hidden md:inline-block">
                    <SearchButton />
                </div> */}

                {/* ---- User and Dark Mode ---- */}
                <div className="flex-1">
                    <div className="flex justify-end items-center  ">
                        <DarkMode />
                        <Favorites />
                    </div>
                </div>

                {/* Dropdown Menu */}
                {/* <DropDownMenu /> */}


            </nav>
            <hr className="dark:border-gray-700" />

            {/* ---- SearchButton Phones ---- */}
            {/* <div className="md:hidden mt-10">
                <SearchButton />
            </div> */}
        </header>
    )
}
