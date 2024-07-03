"use client"; // 필수

import { useGetPokemon } from "@/app/_hooks/query/useGetPokemon";
import { Pokemon } from "@/app/_types/pokemon.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
    return <div>Loading...</div>;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {memoizedPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>{pokemon.korean_name || pokemon.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
