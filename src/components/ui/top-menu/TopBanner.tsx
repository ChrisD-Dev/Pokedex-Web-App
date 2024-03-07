"use client"


import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export const TopBanner = () => {

    const [isVisible, setIsVisible] = useState(true);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };


    return (
        <div className={`w-full h-10 bg-blue-500 animate-slide-down ${(!isVisible) && 'hidden'} flex items-center justify-center relative`}>
            <p className="font-semibold text-white -tracking-tighter">No olvides visitar mi <span className="font-bold text-blue-100 underline"><a href="#">Portfolio</a></span> 🙂</p>
            <button onClick={handleClick} className="absolute right-5">
                <RxCross2 className="text-xl text-blue-100" />
            </button>
        </div>
    )
}
