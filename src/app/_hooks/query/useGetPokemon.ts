import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPokemon = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await axios.get(`/api/pokemons`);
      return response.data;
    },
    staleTime: 300000,
  });

  return { data, isPending, error };
};
