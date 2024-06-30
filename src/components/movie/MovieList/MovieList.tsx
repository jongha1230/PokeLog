import { Movie, MovieListProps, MovieResponse } from "@/types/MovieType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard";

function MovieList({
  data,
  isInfinite = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  title,
}: MovieListProps) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (isInfinite && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isInfinite]);

  if (status === "pending") return <div>로딩중</div>;
  if (status === "error") return <div>오류 발생!</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-white text-3xl font-bold py-4 px-6">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
        {Array.isArray(data)
          ? data.map((movie: Movie, i: number) => (
              <li
                key={i}
                className="border shadow-md p-4 m-4 rounded-3xl bg-white/90"
              >
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} />
                </Link>
              </li>
            ))
          : data?.pages.map((page: MovieResponse) =>
              page.results.map((movie: Movie) => (
                <li
                  key={movie.id}
                  className="border shadow-md p-4 m-4 rounded-3xl bg-white/90"
                >
                  <Link to={`/movie/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </li>
              ))
            )}
      </ul>
      {isInfinite && (
        <div ref={ref}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more movies"}
        </div>
      )}
    </div>
  );
}

export default MovieList;
