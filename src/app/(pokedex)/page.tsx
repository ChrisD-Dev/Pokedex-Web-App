import { getAllPokemons } from "@/actions";
import { Footer, NavBar, GridPokemons, PokemonInfo } from "@/components";
import { ScrollUp } from "@/components/others/ScrollUp";

interface Props {
  searchParams?: {
    query?: string
  }
}

export default async function Home({ searchParams }: Props) {


  const query = searchParams?.query || ""

  const pokmns = await getAllPokemons()





  return (
    <main className=" flex flex-col min-h-screen dark:bg-[#0a192f] relative">
      {/* Menu */}
      <NavBar />

      {/* Body */}
      <div className="w-fit mx-auto mt-10 lg:mt-20 flex-grow">
        <GridPokemons query={query} allPokmns={pokmns} />
      </div>

      <ScrollUp />

      <PokemonInfo />

      {/* Footer */}
      <Footer />

    </main>
  );
}
