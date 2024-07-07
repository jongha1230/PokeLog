import TypeChip, { ValidType } from "@/components/common/TypeChip/TypeChip";
import CommentForm from "@/components/pokemon/comments/CommentForm";
import CommentList from "@/components/pokemon/comments/CommentList";
import {
  useCreateBookmark,
  useDeleteBookmark,
  useGetBookmarks,
} from "@/components/shared/hooks/useBookmark";
import { usePokemonData } from "@/components/shared/hooks/usePokemon";
import { useAuthStore } from "@/store/authStore";
import { PokemonType } from "@/types/PokemonType";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";

import { Button } from "@/components/common";
import BookmarkIcon from "@/components/common/BookmarkIcon/BookmarkIcon";
import TypeBgColor from "./TypeBgColor";

function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pokemonId = id || "1";
  const previousId = +pokemonId >= 1 ? +pokemonId - 1 : 0;
  const nextId = +pokemonId <= 1025 ? +pokemonId + 1 : 1026;

  const { data, status } = usePokemonData(pokemonId);

  const [pokemonData, setPokemonData] = useState<{
    name: string;
    image: string;
    types: string[];
    abilities: string[];
    stats: { name: string; base_stat: number }[];
  } | null>(null);

  const [activeTab, setActiveTab] = useState("comments");
  const user = useAuthStore((state) => state.user);

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const { data: bookmarks } = useGetBookmarks(user?.id || "");
  const createBookmark = useCreateBookmark();
  const deleteBookmark = useDeleteBookmark();

  useEffect(() => {
    if (data) {
      setPokemonData({
        name: data.korean_name,
        image:
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default ||
          "",
        types: data.types.map(
          (typeInfo: PokemonType) =>
            typeInfo.type.korean_name || typeInfo.type.name
        ),
        abilities: data.abilities.map(
          (abilityInfo) =>
            abilityInfo.ability.korean_name || abilityInfo.ability.name
        ),
        stats: data.stats.map((statInfo) => ({
          name: statInfo.stat.korean_name || statInfo.stat.name,
          base_stat: statInfo.base_stat,
        })),
      });
    }
  }, [data]);

  useEffect(() => {
    if (user && bookmarks) {
      setIsBookmarked(
        bookmarks.some((bookmark) => bookmark.pokemonId === pokemonId)
      );
    }
  }, [user, bookmarks, pokemonId]);

  const handleSave = () => {
    setActiveTab("comments");
  };

  const handleToggleBookmark = () => {
    if (!user) {
      return;
    }
    if (isBookmarked) {
      const bookmarkToDelete = bookmarks?.find(
        (bookmark) => bookmark.pokemonId === pokemonId
      );
      if (bookmarkToDelete && bookmarkToDelete.id !== undefined) {
        deleteBookmark.mutate(bookmarkToDelete.id);
      }
    } else {
      createBookmark.mutate({ pokemonId, userId: user.id });
    }
  };

  const typeChips = pokemonData?.types.map((type) => {
    const typeName = type as ValidType;
    return <TypeChip key={type} name={typeName} type={typeName} />;
  }) || <TypeChip name="없음" type="없음" />;

  const primaryType = (pokemonData?.types[0] as ValidType) || "없음";

  if (status === "pending")
    return (
      <div className="bg-gradient-to-t from-gray-200 via-gray-200 to-gray-500 container mx-auto flex flex-col items-center justify-center p-4 h-2/3 text-black">
        <FadeLoader color="#000" loading={true} aria-label="로딩스피너" />
      </div>
    );
  if (status === "error") return <div>오류 발생!</div>;

  return (
    <>
      <TypeBgColor type={primaryType}>
        {pokemonData && (
          <>
            <div className="w-full h-96 flex items-center justify-center relative">
              {previousId > 0 && (
                <Link
                  to={`/pokemon/${previousId}`}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src={
                      data.sprites?.front_default?.replace(
                        id || "",
                        previousId.toString()
                      ) || ""
                    }
                    alt={`Previous Pokémon ${previousId}`}
                    className="w-20 h-20 transition-transform duration-300 transform hover:scale-125"
                  />
                  <p className="text-center">이전</p>
                </Link>
              )}

              {nextId < 1026 && (
                <Link
                  to={`/pokemon/${nextId}`}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src={
                      data.sprites?.front_default?.replace(
                        id || "",
                        nextId.toString()
                      ) || ""
                    }
                    alt={`Next Pokémon ${nextId}`}
                    className="w-20 h-20 transition-transform duration-300 transform hover:scale-125"
                  />
                  <p className="text-center">Next</p>
                </Link>
              )}

              <div>
                <img
                  src={pokemonData.image}
                  alt={pokemonData.name}
                  className="w-60 h-60 object-cover rounded-lg mx-auto"
                />
                <div className="bottom-8 left-8 text-white bg-black bg-opacity-50 p-6 rounded-lg md:max-w-2xl mx-auto mt-4">
                  <h1 className="text-3xl font-semibold mb-4">
                    {pokemonData.name}{" "}
                    {user && (
                      <button onClick={handleToggleBookmark}>
                        <BookmarkIcon
                          fill={isBookmarked ? "red" : "white"}
                          stroke={isBookmarked ? "red" : "black"}
                          className="w-6 h-6 inline-block ml-2"
                        />
                      </button>
                    )}
                  </h1>
                  <div className="pokemon-types flex gap-1.5 mb-2">
                    타입 {typeChips}
                  </div>
                  <p>어빌리티: {pokemonData.abilities.join(", ")}</p>
                  <div className="flex gap-4 mt-2">
                    {pokemonData.stats.map((stat) => (
                      <p key={stat.name}>
                        {stat.name}: {stat.base_stat}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </TypeBgColor>
      {/* 탭 추가 */}
      <div className="flex justify-center mt-4 gap-4">
        <Button
          intent={`${activeTab === "comments" ? "red" : "secondary"}`}
          size={"md"}
          onClick={() => setActiveTab("comments")}
        >
          댓글 목록
        </Button>
        <Button
          intent={`${activeTab === "writeComment" ? "red" : "secondary"}`}
          size={"md"}
          onClick={() => setActiveTab("writeComment")}
        >
          댓글 작성
        </Button>
      </div>
      {/* 댓글 */}
      {activeTab === "comments" && <CommentList pokemonId={pokemonId} />}
      {activeTab === "writeComment" && (
        <CommentForm pokemonId={pokemonId} onSave={handleSave} user={user} />
      )}
    </>
  );
}

export default PokemonDetailPage;
