import api from "@/api";
import { BookmarkRow } from "@/types/supabaseTypes";
import { useQuery } from "@tanstack/react-query";
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
  return useQuery({
    queryKey: ["bookmarksWithDetails", userId],
    queryFn: async () => {
      const bookmarks: BookmarkRow[] = await api.bookmark.getBookmarks(userId);
      const movieDetails = await Promise.all(
        bookmarks.map(async (bookmark) => {
          const movie = await api.movie.fetchMovieDetails(
            Number(bookmark.movie_id)
          );
          return movie;
        })
      );
      return movieDetails;
    },
  });
};
