"use client"

import { useEffect, useState } from "react";
import { Variants, motion, useAnimationControls, useScroll } from "framer-motion"
import { FaArrowUp } from "react-icons/fa";


const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

const ScrollToTopContainerVariants: Variants = {
    hide: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
};


export const ScrollUp = () => {

    const [showButton, setShowButton] = useState(false);
    const { scrollYProgress } = useScroll();
    const controls = useAnimationControls();

    // Scroll to Top Function
    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    useEffect(() => {
        return scrollYProgress.on('change', (latestValue) => {
            if (latestValue > 0.1) {
                controls.start('show');
            } else {
                controls.start('hide');
            }
        });
    });

    return (
        <motion.button
            className="fixed 2xl:bottom-10 2xl:right-10 bottom-0 right-0 p-3 hidden lg:block rounded-full hover:bg-blue-100 dark:hover:bg-[#162946]"
            variants={ScrollToTopContainerVariants}
            initial="hide"
            animate={controls}
            onClick={scrollToTop}>
            <FaArrowUp className=" 2xl:w-6 2xl:h-6 text-blue-500 dark:text-[#a8b4d3]" />
        </motion.button>

    )
}
