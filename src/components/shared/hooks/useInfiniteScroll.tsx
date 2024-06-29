import { MovieResponse } from "@/types/MovieType";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

// 무한 스크롤 형식
export const useInfiniteScroll = (
  queryKey: string,
  fetchFunction: (pageParam: number) => Promise<MovieResponse>
) => {
  return useInfiniteQuery<
    MovieResponse,
    Error,
    InfiniteData<MovieResponse>,
    string[],
    number
  >({
    queryKey: [queryKey],
    queryFn: ({ pageParam = 1 }) => fetchFunction(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });
};
