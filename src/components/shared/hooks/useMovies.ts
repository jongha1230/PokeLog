// import api from "@/api";
// import { useInfiniteQuery } from "@tanstack/react-query";

// export const usePopularMovies = () => {
//   const { fetchNextPage, hasNextPage, isFetchingNextPage, ...result } =
//     useInfiniteQuery({
//       queryKey: ["popularMovies"],
//       queryFn: ({ pageParam = 1 }) => api.movie.fetchPopularMovies(pageParam),
//       getNextPageParam: (lastPage) => {
//         if (lastPage.page < lastPage.total_pages) {
//           return lastPage.page + 1;
//         }
//         return undefined;
//       },
//       getPreviousPageParam: (firstPage) => {
//         if (firstPage.page > 1) {
//           return firstPage.page - 1;
//         }
//         return undefined;
//       },
//     });

//   return {
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     ...result,
//   };
// };
