import GenerationChip from "@/components/common/GenerationChip";
import { Generation } from "@/components/common/GenerationChip/GenerationChip";
import PokemonList from "@/components/pokemon/PokemonList";
import { usePokemonListWithSpecies } from "@/components/shared/hooks/usePokemon";
import generationLimits from "@/utils/generationLimits";
import { useState } from "react";

function MainPage() {
  const [activeGenerations, setActiveGenerations] = useState<number[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    usePokemonListWithSpecies(activeGenerations);

  const generations: Generation[] = Object.keys(generationLimits).map(
    Number
  ) as Generation[];

  const handleGenerationToggle = (gen: Generation) => {
    if (activeGenerations.length === generations.length) {
      setActiveGenerations([]);
    } else {
      setActiveGenerations((prev) => {
        const updatedGenerations = prev.includes(gen)
          ? prev.filter((g) => g !== gen)
          : [...prev, gen];
        return updatedGenerations.sort((a, b) => a - b);
      });
    }
  };

  const handleAllToggle = () => {
    if (activeGenerations.length === 0) {
      setActiveGenerations(generations);
    } else {
      setActiveGenerations([]);
    }
  };

  const getTitle = () => {
    if (activeGenerations.length === 0) return "전체 포켓몬 목록";
    return `${activeGenerations.join(", ")}세대 포켓몬 목록`;
  };

  return (
    <div className="bg-green-200 p-4 rounded-lg shadow-md">
      <div className="flex justify-center py-4 gap-x-2 flex-wrap">
        <div
          className={`text-sm border rounded-full px-3 py-0.5 hover:opacity-50 transition-opacity font-semibold cursor-pointer ${
            activeGenerations.length === 0
              ? "bg-gray-200 border-gray-200 text-black"
              : "bg-gray-800 border-gray-800 text-white"
          }`}
          onClick={handleAllToggle}
        >
          전체
        </div>
        {generations.map((gen) => (
          <GenerationChip
            key={gen}
            generation={gen}
            isSelected={activeGenerations.includes(gen)}
            onToggle={handleGenerationToggle}
          />
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
