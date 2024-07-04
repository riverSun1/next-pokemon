import { Name } from "@/types/pokemon.type";
import axios from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON = 25;

export const GET = async (request: Request) => {
  try {
    const allPokemonPromises = Array.from(
      { length: TOTAL_POKEMON },
      (_, index) => {
        const id = index + 1;
        // 배열로 써서 한번에 2가지 응답받음.
        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }
    );

    // 모든 Promise가 끝나고 한번에 받는 완전한 데이터
    const allPokemonResponses = await Promise.all(allPokemonPromises);
    // console.log(allPokemonResponses); //
    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], index) => {
        //console.log(speciesResponse.data.names);
        const koreanName = speciesResponse.data.names.find(
          (name: Name) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
