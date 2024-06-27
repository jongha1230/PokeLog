import api from "@/api";
import { MovieResponse } from "@/types/MovieType";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

export const usePopularMovies = () => {
  return useInfiniteQuery<
    MovieResponse,
    Error,
    InfiniteData<MovieResponse>,
    string[],
    number
  >({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1 }) => api.movie.fetchPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return undefined;
    },
  });
};

export const useGetMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ["Movie", movieId],
    queryFn: async () => {
      const data = await api.movie.fetchMovieDetails(movieId);
      return data;
    },
    enabled: !!movieId,
  });
};
