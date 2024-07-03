"use client"; // 필수

import { useGetPokemon } from "@/app/_hooks/query/useGetPokemon";
import { Pokemon } from "@/app/_types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import monsterball from "../../../../public/monsterball.png";
import Skeleton from "../Skeleton";

const PokemonList = () => {
  const { data, isPending, error } = useGetPokemon();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (data) {
      setPokemons(data);
    }
  }, [data]);

  const memoizedPokemons = useMemo(() => pokemons, [pokemons]);

  if (isPending) {
    return <Skeleton />;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center m-20 gap-10">
      <h1 className="flex flex-row text-3xl font-bold gap-3">
        <Image src={monsterball} alt="monster ball" width={35} height={35} />
        포켓몬 도감
      </h1>
      <ul className="grid grid-cols-5 gap-5 cursor-pointer">
        {memoizedPokemons.map((pokemon) => (
          <li
            key={pokemon.id}
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
