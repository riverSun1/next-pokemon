import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetDetail = (id: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["detail", id],
    queryFn: async () => {
      const response = await axios.get(`/api/pokemons/${id}`);
      return response.data;
    },
  });

  return { data, isPending, error };
};
