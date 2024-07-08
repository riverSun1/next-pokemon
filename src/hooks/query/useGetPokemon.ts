import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPokemon = () => {
  const {
    data,
    fetchNextPage, //
    hasNextPage, //
    isFetching,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`/api/pokemons?page=${pageParam}`);
      return response.data;
    },
    // 초기 페이지 번호를 설정
    initialPageParam: 1,

    // 다음 페이지가 있는지?
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // 예를 들어, 마지막 페이지에서 다음 페이지 번호를 계산할 로직
      if (lastPage.hasNextPage) {
        return lastPageParam + 1; // 다음 페이지 번호
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  };
};

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useGetPokemon = () => {
//   const { data, isPending, error } = useQuery({
//     queryKey: ["pokemon"],
//     queryFn: async () => {
//       const response = await axios.get(`/api/pokemons`);
//       return response.data;
//     },
//   });

//   return { data, isPending, error };
// };
