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

// api 요청을 바꿔야 할지, 쿼리 클라이언트를 사용해서 데이터 캐싱으로 중복 요청을 방지하는 걸로 가야 할지 고민입니다. 사실 데이터 캐싱을 해도 팔로우 항목이 1000이 넘는다면, 그 요청은 생각보다 서버에 과부하가 될 것이라고 예상했기 때문이죠. 하지만 팔로우하는 api는 fetchMovieDetails에서 추가하는 데이터라 변질될 위험이 있다고 생각해서. 현재 최선의 방법은 캐싱을 이용하는 방법이라고 생각해요.
// export const useGetBookmarksWithDetails = (userId: string) => {
//   const queryClient = useQueryClient();

//   return useQuery({
//     queryKey: ["bookmarksWithDetails", userId],
//     queryFn: async () => {
//       const bookmarks: BookmarkRow[] = await api.bookmark.getBookmarks(userId);

//       const movieDetails = await Promise.all(
//         bookmarks.map(async (bookmark) => {
//           const movieId = Number(bookmark.movie_id);
//           const cachedMovie = queryClient.getQueryData(["Movie", movieId]);

//           if (cachedMovie) {
//             return cachedMovie;
//           } else {
//             const movie = await api.movie.fetchMovieDetails(movieId);
//             queryClient.setQueryData(["Movie", movieId], movie);
//             return movie;
//           }
//         })
//       );

//       return movieDetails;
//     },
//   });
// };
