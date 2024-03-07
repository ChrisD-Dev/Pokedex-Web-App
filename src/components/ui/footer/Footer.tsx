import { MdCatchingPokemon } from "react-icons/md"
import Image from 'next/image';

export const Footer = () => {
    return (
        <div className="w-full px-5 ">
            <hr className="mt-10 dark:border-gray-700" />
            <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto text-center">
                {/* ---- Logo ----- */}
                <div className="flex justify-center">
                    <div className="flex items-center gap-x-1">
                        <span className="text-xl font-bold dark:text-[#ebebec] text-blue-500">Pokedex</span>
                        <MdCatchingPokemon className="text-blue-500 h-6 w-6" />
                    </div>
                </div>

                {/* ---- Texto ---- */}
                {/* <div className="mt-3 text-base">
                    <p className="text-gray-500"><span>Proyecto realizado en <span className="font-bold">Next.js</span></span></p>
                    <a href="#" className="text-blue-500 hover:text-blue-600 font-bold dark:text-[#a8b4d3] hover:dark:text-[#bfc9e3]">Portfolio</a>
                </div> */}


                {/* ---- Attribution ---- */}
                <div className='mt-2'>
                    <p className='text-blue-500 md:text-xs text-[8px]  tracking-[1px] py-1 text-center'>Powered by</p>
                    <Image
                        alt='Attribution'
                        height={512}
                        width={512}
                        className='w-16 md:w-24   mx-auto'
                        src={'/Attribution/Attribution.png'}
                    />
                </div>


            </footer>
        </div>

    )
}
