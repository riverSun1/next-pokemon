import { useGetPokemon } from "@/hooks/query/useGetPokemon";
import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import monsterball from "../../../public/monsterball.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const PokemonList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useGetPokemon();

  const pokemons: Pokemon[] = useMemo(() => {
    // 모든 페이지의 데이터를 합치는 로직
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    fetchNextPage();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data && !isError) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center m-20 gap-10">
      <h1 className="flex flex-row text-3xl font-bold gap-3">
        <Image src={monsterball} alt="monster ball" width={35} height={35} />
        포켓몬 도감
      </h1>
      <ul className="grid grid-cols-5 gap-5 cursor-pointer">
        {pokemons.map((pokemon: Pokemon) => (
          <li
            key={uuidv4()}
            className="border-2 border-gray-500 bg-white rounded-md p-5 hover:bg-gray-100"
          >
            <Link href={`/pokemon/${pokemon.id}`}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p className="text-center">
                {pokemon.korean_name || pokemon.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
