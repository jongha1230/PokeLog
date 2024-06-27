import { usePopularMovies } from "@/components/shared/hooks/useMovies";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard from "../MovieCard";

function MovieList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePopularMovies();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "pending") return <div>로딩중</div>;
  if (status === "error") return <div>오류 발생!</div>;

  return (
    <div>
      <div>
        {data?.pages.map((page, i) => (
          <div key={i}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 bg-white">
              {page.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div ref={ref}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "No more movies"}
      </div>
    </div>
  );
}

export default MovieList;
