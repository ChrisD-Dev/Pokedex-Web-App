"use client"

import { useDarModeStore } from "@/store";
import { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi"
import { IoSunnyOutline } from "react-icons/io5";

export const DarkMode = () => {

    const darkModeStored = useDarModeStore(state => state.darkMode)
    const turnOnDarkMode = useDarModeStore(state => state.turnOnDarkMode)
    const turnOffDarkMode = useDarModeStore(state => state.turnOffDarkMode)
    const [darkMode, setDarkMode] = useState(darkModeStored)

    const handleChange = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            turnOnDarkMode()
        } else {
            document.documentElement.classList.remove('dark')
            turnOffDarkMode()
        }

    }, [darkMode])


    return (
        <div className="cursor-pointer" onClick={handleChange}>
            {
                (darkMode)
                    ? <IoSunnyOutline className="text-[#ebebec] hover:bg-[#162946] rounded-full h-8 w-8 p-2" />
                    : <FiMoon className="hover:bg-blue-100 rounded-full  h-8 w-8 p-2" />
            }

        </div>
    )
}
