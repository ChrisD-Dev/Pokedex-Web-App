"use client"

import { useSearchParams, usePathname, useRouter, redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"


export const SearchButton = () => {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace, push } = useRouter()

    // Utiliza para que cada vez que se recargue la pagina, si hay una busqueda previa, que la URL se limpie
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const query = params.get('query');
        // Si hay una búsqueda en la URL, redirige a "/pokedex"
        if (query) {
            push("/pokedex");
        }
    }, []);

    //useDebounced -> Permite que haya un retardo de 500 ms al teclear info en el input
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 500)


    return (
        <div className="relative">
            <input
                defaultValue={searchParams.get('query')?.toString()}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
                type="email"
                className="peer py-3 px-4 ps-11  w-full bg-transparent border-[1px] dark:border-gray-700 dark:focus:ring-gray-500  rounded-lg text-sm dark:text-[#a8b4d3] dark:focus:border-gray-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Saerch Pokemon..." />
            <div
                className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                <svg className="flex-shrink-0 h-4 w-4 text-gray-500 dark:text-[#a8b4d3]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
        </div>
    )
}
