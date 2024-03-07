import Link from "next/link"
import { LuHeart } from "react-icons/lu"

export const Favorites = () => {

    return (
        <Link href={"/favoritos"}>
            <div
                className=" rounded-full hover:bg-blue-100 cursor-pointer dark:hover:bg-[#162946] hover:animate-rotateFrame">
                <LuHeart className="w-8 h-8 p-2 dark:text-[#ebebec]" />

            </div>
        </Link>
    )
}
