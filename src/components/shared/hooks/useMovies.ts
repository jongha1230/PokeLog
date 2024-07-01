import api from "@/api";
import { Movie } from "@/types/MovieType";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

// 인기 영화 무한 스크롤 불러오기
export const usePopularMovies = () => {
  return useInfiniteScroll("popularMovies", api.movie.fetchPopularMovies);
};

// 현재 상영 영화 무한 스크롤
export const useNowPlayingMovies = () => {
  return useInfiniteScroll("nowPlayingMovies", api.movie.fetchNowPlayingMovies);
};

// 상영 예정 영화 무한 스크롤
export const useUpcomingMovies = () => {
  return useInfiniteScroll("upcomingMovies", api.movie.fetchUpcomingMovies);
};

// 영화 항목 불러오기
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

// 북마크 영화 목록 불러오기

export const useGetBookmarksWithDetails = (userId: string) => {
  const queryClient = useQueryClient();

  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => api.bookmark.getBookmarks(userId),
    enabled: !!userId, // userId가 유효한 경우에만 쿼리 실행
  });

  const movieQueries = useQueries({
    queries: bookmarksQuery.data
      ? bookmarksQuery.data.map((bookmark) => {
          const movieId = Number(bookmark.movie_id);
          return {
            queryKey: ["Movie", movieId],
            queryFn: () => api.movie.fetchMovieDetails(movieId),
            enabled: bookmarksQuery.isSuccess,
          };
        })
      : [],
  });

  useEffect(() => {
    if (bookmarksQuery.data) {
      queryClient.invalidateQueries({ queryKey: ["Movie"] });
    }
  }, [bookmarksQuery.data, queryClient]);

  const movieDetails = movieQueries
    .map((result) => result.data)
    .filter((movie): movie is Movie => movie !== undefined);

  // 전체 상태를 통합하여 하나의 상태로 반환
  const status: "pending" | "error" | "success" =
    bookmarksQuery.status === "pending" ||
    movieQueries.some((result) => result.status === "pending")
      ? "pending"
      : movieQueries.some((result) => result.status === "error")
      ? "error"
      : "success";

  return {
    data: movieDetails,
    status,
  };
};
