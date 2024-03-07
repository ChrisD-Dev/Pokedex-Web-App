"use client"

import Link from "next/link"
import { useState } from "react";
import { LuClipboardCheck } from "react-icons/lu"

export const Portfolio = () => {

    const [mostrarSubmenu, setMostrarSubmenu] = useState(false);

    const handleOpenOrCloseSubmenu = () => {
        setMostrarSubmenu(!mostrarSubmenu);
    };

    return (
        <div className="relative">
            <Link href={"#"}>
                <div
                    onMouseEnter={handleOpenOrCloseSubmenu}
                    onMouseLeave={handleOpenOrCloseSubmenu}
                    className=" rounded-full hover:bg-blue-100 cursor-pointer dark:hover:bg-[#162946] hover:animate-rotateFrame">
                    <LuClipboardCheck className="w-8 h-8 p-2 dark:text-[#ebebec]" />


                </div>
            </Link>
            {
                (mostrarSubmenu) &&
                <div
                    className="absolute   z-10 mt-2 px-3 py-1 right-0 rounded-md bg-blue-50 dark:bg-[#162946] shadow-md ">
                    <span className="text-xs dark:text-white">Portfolio</span>
                </div>
            }
        </div>
    )
}