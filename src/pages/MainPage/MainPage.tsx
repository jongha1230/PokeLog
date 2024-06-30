import { MovieList } from "@/components/movie";
import { usePopularMovies } from "@/components/shared/hooks/useMovies";

function MainPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePopularMovies();

  return (
    <div className="bg-slate-800">
      <MovieList
        title="인기 영화"
        data={data}
        status={status}
        isInfinite={true}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

export default MainPage;
