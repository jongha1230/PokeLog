import PokemonList from "@/components/pokemon/PokemonList";
import { useGetBookmarksWithDetails } from "@/components/shared/hooks/usePokemon";
import { useAuthStore } from "@/store/authStore";

function BookMarkListPage() {
  const user = useAuthStore((state) => state.user);
  const { data, status } = useGetBookmarksWithDetails(user?.id || "");

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }
  console.log(data);
  return (
    <div className="bg-green-200 p-4 rounded-lg shadow-md min-h-screen">
      <PokemonList
        title="북마크 목록"
        data={data}
        status={status}
        isInfinite={false}
        filterComponent={null}
      />
    </div>
  );
}

export default BookMarkListPage;
