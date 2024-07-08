import { Name } from "@/types/pokemon.type";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON = 151; // 6페이지까지 불러올 예정.
const PAGE_SIZE = 30;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1"); // 페이지 값에 해당.
  const offset = (page - 1) * PAGE_SIZE; // ~까지. 그다음에 가져올 것임.

  try {
    const allPokemonPromises = Array.from({ length: PAGE_SIZE }, (_, index) => {
      const id = index + 1 + offset;
      if (id > TOTAL_POKEMON) return null;

      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
    }).filter(
      (promise): promise is Promise<[AxiosResponse<any>, AxiosResponse<any>]> =>
        promise !== null
    );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find(
          (name: Name) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    // 총 페이지 수 및 다음 페이지 여부 계산
    const totalPages = Math.ceil(TOTAL_POKEMON / PAGE_SIZE);
    const hasNextPage = page < totalPages;

    // console.log("totalPages => ", totalPages); // 6

    // 결과 반환
    return NextResponse.json({
      data: allPokemonData,
      totalPages,
      hasNextPage,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
