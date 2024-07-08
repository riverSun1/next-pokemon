import { useGetPokemon } from "@/hooks/query/useGetPokemon";
import { Pokemon } from "@/types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import monsterball from "../../../public/monsterball.png";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const PokemonList = () => {
  const { data, fetchNextPage, isError } = useGetPokemon();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const pokemons: Pokemon[] = useMemo(() => {
    // 모든 페이지의 데이터를 합치는 로직
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

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
      <div ref={ref} className="flex justify-center pt-4">
        {inView && (
          <Image
            className="shake"
            src="/monsterball.png"
            alt="loading"
            width={40}
            height={40}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonList;
