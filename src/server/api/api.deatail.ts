import { Ability, Move, Name, Type } from "@/types/pokemon.type";
import axios from "axios";

export const pokemonDetailData = async (id: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    const koreanName = speciesResponse.data.names?.find(
      (name: Name) => name.language.name === "ko"
    );

    const typesWithKoreanNames = await Promise.all(
      response.data.types.map(async (type: Type) => {
        // console.log("response ==>", response.data.types);
        const typeResponse = await axios.get(type.type.url);
        const koreanTypeName =
          typeResponse.data.names?.find(
            (name: Name) => name.language.name === "ko"
          )?.name || type.type.name;
        // console.log("koreanTypeName ==> ", typeResponse.data.names);
        return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
      })
    );

    const abilitiesWithKoreanNames = await Promise.all(
      response.data.abilities.map(async (ability: Ability) => {
        // console.log("abilities ==>", response.data.abilities);
        const abilityResponse = await axios.get(ability.ability.url);
        const koreanAbilityName =
          abilityResponse.data.names?.find(
            (name: Name) => name.language.name === "ko"
          )?.name || ability.ability.name;
        return {
          ...ability,
          ability: { ...ability.ability, korean_name: koreanAbilityName },
        };
      })
    );

    const movesWithKoreanNames = await Promise.all(
      response.data.moves.map(async (move: Move) => {
        const moveResponse = await axios.get(move.move.url);
        const koreanMoveName =
          moveResponse.data.names?.find(
            (name: Name) => name.language.name === "ko"
          )?.name || move.move.name;
        return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
      })
    );

    const pokemonData = {
      ...response.data,
      korean_name: koreanName?.name || response.data.name,
      types: typesWithKoreanNames,
      abilities: abilitiesWithKoreanNames,
      moves: movesWithKoreanNames,
    };

    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return { error: "Failed to fetch data" };
  }
};
