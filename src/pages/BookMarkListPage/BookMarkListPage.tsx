import { MovieList } from "@/components/movie";
import { useGetBookmarksWithDetails } from "@/components/shared/hooks/useMovies";
import { useAuthStore } from "@/store/authStore";

function BookMarkListPage() {
  const user = useAuthStore((state) => state.user);

  const { data, status } = useGetBookmarksWithDetails(user?.id || "");

  return (
    <div className="bg-slate-800">
      <MovieList
        title="북마크 목록"
        data={data}
        status={status}
        isInfinite={false}
      />
    </div>
  );
}

export default BookMarkListPage;
