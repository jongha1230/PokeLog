import api from "@/api";
import generationLimits from "@/utils/generationLimits";

import { Pokemon, PokemonResponse } from "@/types/PokemonType";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "./useInfiniteScroll";

// 세대별 포켓몬 목록 불러오기
export const usePokemonList = (activeGenerations: number[]) => {
  const fetchPokemonList = async (offset: number): Promise<PokemonResponse> => {
    if (activeGenerations.length === 0) {
      const response = await api.pokemon.fetchPokemonList(20, offset);
      response.results.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
      );
      return response;
    }

    let remainingOffset = offset;
    for (const gen of activeGenerations) {
      const { start, end } = generationLimits[gen];
      const genCount = end - start + 1;

      if (remainingOffset < genCount) {
        const response = await api.pokemon.fetchPokemonListByGeneration(
          start,
          end,
          20,
          remainingOffset
        );
        response.results.sort(
          (a: { id: number }, b: { id: number }) => a.id - b.id
        );
        return response;
      }

      remainingOffset -= genCount;
    }

    // 모든 선택된 세대를 넘어선 경우
    return { results: [], next: null, previous: null, count: 0 };
  };

  return useInfiniteScroll(
    `pokemonList-${activeGenerations.join("-")}`,
    fetchPokemonList
  );
};

// 포켓몬 데이터 불러오기
export const usePokemonData = (id: string) => {
  return useQuery({
    queryKey: ["pokemonData", id],
    queryFn: () => api.pokemon.fetchPokemonData(id),
  });
};

// 포켓몬 종 데이터 불러오기
export const usePokemonSpecies = (id: string) => {
  return useQuery({
    queryKey: ["pokemonSpecies", id],
    queryFn: () => api.pokemon.fetchPokemonSpecies(id),
  });
};

// 포켓몬 타입 데이터 불러오기
export const usePokemonType = (type: string) => {
  return useQuery({
    queryKey: ["pokemonType", type],
    queryFn: () => api.pokemon.fetchPokemonType(type),
  });
};

// 포켓몬 능력 데이터 불러오기
export const usePokemonAbility = (ability: string) => {
  return useQuery({
    queryKey: ["pokemonAbility", ability],
    queryFn: () => api.pokemon.fetchPokemonAbility(ability),
  });
};

// 포켓몬 기술 데이터 불러오기
export const usePokemonMove = (move: string) => {
  return useQuery({
    queryKey: ["pokemonMove", move],
    queryFn: () => api.pokemon.fetchPokemonMove(move),
  });
};

// 으악
export const usePokemonListWithSpecies = (activeGenerations: number[]) => {
  const fetchPokemonList = async (offset: number): Promise<PokemonResponse> => {
    if (activeGenerations.length === 0) {
      const response = await api.pokemon.fetchPokemonList(20, offset);
      response.results.sort(
        (a: { id: number }, b: { id: number }) => a.id - b.id
      );
      return response;
    }

    let remainingOffset = offset;
    for (const gen of activeGenerations) {
      const { start, end } = generationLimits[gen];
      const genCount = end - start + 1;

      if (remainingOffset < genCount) {
        const response = await api.pokemon.fetchPokemonListByGeneration(
          start,
          end,
          20,
          remainingOffset
        );
        response.results.sort(
          (a: { id: number }, b: { id: number }) => a.id - b.id
        );
        return response;
      }

      remainingOffset -= genCount;
    }

    // 모든 선택된 세대를 넘어선 경우
    return { results: [], next: null, previous: null, count: 0 };
  };

  const infiniteScrollResult = useInfiniteScroll(
    `pokemonList-${activeGenerations.join("-")}`,
    fetchPokemonList
  );

  const allPokemon =
    infiniteScrollResult.data?.pages.flatMap((page) => page.results) ?? [];

  const filteredPokemon =
    activeGenerations.length === 0
      ? allPokemon
      : allPokemon.filter((pokemon) =>
          activeGenerations.some((gen) => {
            const { start, end } = generationLimits[gen];
            return pokemon.id >= start && pokemon.id <= end;
          })
        );

  const speciesQueries = useQueries({
    queries: filteredPokemon.map((pokemon: Pokemon) => ({
      queryKey: ["pokemonList", pokemon.id],
      queryFn: () => api.pokemon.fetchPokemonSpecies(pokemon.id.toString()),
    })),
  });

  return {
    ...infiniteScrollResult,
    filteredPokemon,
    speciesData: speciesQueries,
  };
};
