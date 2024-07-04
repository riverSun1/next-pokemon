import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPokemon = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await axios.get(`/api/pokemons`);
      return response.data;
    },
  });

  return { data, isPending, error };
};
