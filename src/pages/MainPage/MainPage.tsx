import PokemonList from "@/components/pokemon/PokemonList";
import { usePokemonListWithSpecies } from "@/components/shared/hooks/usePokemon";
import generationLimits from "@/utils/generationLimits";
import { useState } from "react";

function MainPage() {
  const [activeGenerations, setActiveGenerations] = useState<number[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePokemonListWithSpecies(activeGenerations);

  const generations = Object.keys(generationLimits).map(Number);

  const handleGenerationToggle = (gen: number) => {
    setActiveGenerations((prev) => {
      const updatedGenerations = prev.includes(gen)
        ? prev.filter((g) => g !== gen)
        : [...prev, gen];
      return updatedGenerations.sort((a, b) => a - b);
    });
  };

  const getTitle = () => {
    if (activeGenerations.length === 0) return "전체 포켓몬 목록";
    return `${activeGenerations.join(", ")}세대 포켓몬 목록`;
  };

  return (
    <div className="">
      <div className="flex justify-center py-4">
        <label>
          <input
            type="checkbox"
            checked={activeGenerations.length === 0}
            onChange={() => setActiveGenerations([])}
          />
          전체
        </label>
        {generations.map((gen) => (
          <label key={gen}>
            <input
              type="checkbox"
              checked={activeGenerations.includes(gen)}
              onChange={() => handleGenerationToggle(gen)}
            />
            {`${gen}세대`}
          </label>
        ))}
      </div>
      <PokemonList
        title={getTitle()}
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
