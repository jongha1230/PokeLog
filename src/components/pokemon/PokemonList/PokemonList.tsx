import {
  Pokemon,
  PokemonListProps,
  PokemonResponse,
} from "@/types/PokemonType";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import PokemonCard from "../PokemonCard";
import PokemonSkeletonList from "../PokemonSkeletonList";

// 타입 가드 함수 수정
function isInfiniteData(
  data: InfiniteData<PokemonResponse> | Pokemon[] | undefined
): data is InfiniteData<PokemonResponse> {
  return (data as InfiniteData<PokemonResponse>)?.pages !== undefined;
}

const PokemonList = ({
  data,
  isInfinite = false,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  title,
  filterComponent,
}: PokemonListProps & { filterComponent: React.ReactNode }) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (isInfinite && inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isInfinite]);

  if (status === "error") return <div>오류 발생!</div>;

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-black text-3xl font-bold py-4 px-6 text-center">
        {title}
      </h2>
      {filterComponent}
      <ul className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 xxl:gap-x-4 xxl:gap-y-4">
        {status === "pending" ? (
          <PokemonSkeletonList />
        ) : (
          <>
            {isInfiniteData(data)
              ? data.pages.flatMap((page: PokemonResponse) =>
                  page.results.map((pokemon: Pokemon) => (
                    <li
                      key={pokemon.name}
                      className="border shadow-md p-4 m-4 rounded-3xl w-48 bg-white"
                    >
                      <Link to={`/pokemon/${pokemon.id}`}>
                        <PokemonCard pokemon={pokemon} />
                      </Link>
                    </li>
                  ))
                )
              : data?.map((pokemon: Pokemon) => (
                  <li
                    key={pokemon.name}
                    className="border shadow-md p-4 m-4 rounded-3xl w-48 bg-white"
                  >
                    <Link to={`/pokemon/${pokemon.id}`}>
                      <PokemonCard pokemon={pokemon} />
                    </Link>
                  </li>
                ))}
          </>
        )}
      </ul>
      {isInfinite && (
        <div ref={ref} className="text-center">
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No more Pokémon"}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
