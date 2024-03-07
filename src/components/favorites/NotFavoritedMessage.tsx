"use client"

import Link from "next/link"
import { motion } from "framer-motion"



export const NotFavoritedMessage = () => {
    return (
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
            <div className=" w-full h-full flex justify-center items-center text-center px-4 md:px-0 ">
                <div className="flex flex-col justify-center items-center text-slate-700 dark:text-gray-500">
                    <p className="md:text-xl">Vaya, parece que todavía no tienes ningún favorito.</p>
                    <p className="md:text-lg mt-2">¿Quieres <span className="text-blue-500 hover:text-blue-600 dark:text-[#a8b4d3] font-bold"><Link href={"/"}>agregar</Link></span> alguno?</p>
                    <img
                        className=" md:w-[280px] w-[250px] mt-5"
                        src="/exeggute.png" alt="exeggcute image" />
                </div>
            </div>
        </motion.div>
    )
}
