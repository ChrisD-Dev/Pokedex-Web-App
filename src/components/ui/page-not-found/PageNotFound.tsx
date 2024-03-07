import Link from "next/link"

export const PageNotFound = () => {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center relative">
            <div className="text-center">
                <h2 className="antialiased text-9xl text-blue-500">404</h2>
                <p className="font-semibold text-xl text-slate-600">Oooops! Lo sentimos mucho</p>
                <p className="font-light mt-2">
                    <span>Regresar al </span>
                    <Link href={"/"} className="text-blue-400 font-bold hover:underline transition-all">Home</Link>
                </p>

            </div>

        </div>
    )
}
