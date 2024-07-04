import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPokemon = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await axios.get(`/api/pokemons`);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // 예를 들어, 마지막 페이지에서 다음 페이지 번호를 계산할 로직
      if (lastPage.hasNextPage) {
        return allPages.length + 1; // 다음 페이지 번호
      }
      return undefined; // 더 이상 페이지가 없으면 undefined 반환
    },
    // 초기 페이지 번호를 설정
    initialPageParam: 1,
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
