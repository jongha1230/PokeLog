import { PokemonResponse } from "@/types/PokemonType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteScroll = (
  queryKey: string,
  fetchFunction: (offset: number) => Promise<PokemonResponse>
) => {
  return useInfiniteQuery<
    PokemonResponse,
    Error,
    InfiniteData<PokemonResponse>,
    string[],
    number
  >({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 0 }) => fetchFunction(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.reduce(
        (acc, page) => acc + page.results.length,
        0
      );
      return lastPage.next ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
};
