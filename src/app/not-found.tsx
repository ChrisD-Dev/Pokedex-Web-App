import { PageNotFound } from '@/components'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: '404 | Pagina no encontrada',
    description: 'Page 404',
    keywords: ["pokemon", "pokedex", "Next", "React", "Tailwind"]
}


const page404 = () => {
    return (
        <>
            <PageNotFound />
        </>
    )
}

export default page404