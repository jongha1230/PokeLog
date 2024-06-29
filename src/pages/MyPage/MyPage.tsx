import { MovieList } from "@/components/movie";
import { useGetBookmarksWithDetails } from "@/components/shared/hooks/useMovies";
import { useAuthStore } from "@/store/authStore";

function MyPage() {
  const user = useAuthStore((state) => state.user);

  const { data } = useGetBookmarksWithDetails(user?.id || "");

  return (
    <div className="bg-slate-800">
      <MovieList data={data} isInfinite={false} />
    </div>
  );
}

export default MyPage;
