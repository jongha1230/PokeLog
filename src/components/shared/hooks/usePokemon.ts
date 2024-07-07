import api from "@/api";
import generationLimits from "@/utils/generationLimits";

import {
  Pokemon,
  PokemonResponse,
  TranslatedKoreanData,
} from "@/types/PokemonType";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
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

// 북마크 목록 불러오기
export const useGetBookmarksWithDetails = (userId: string) => {
  const queryClient = useQueryClient();

  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => api.bookmark.getBookmarks(userId),
    enabled: !!userId,
  });

  const pokemonQueries = useQueries({
    queries: bookmarksQuery.data
      ? bookmarksQuery.data.map((bookmark) => {
          const pokemonId = bookmark.pokemonId;
          return {
            queryKey: ["Pokemon", pokemonId],
            queryFn: () => api.pokemon.fetchPokemonData(pokemonId),
            enabled: bookmarksQuery.isSuccess,
          };
        })
      : [],
  });

  useEffect(() => {
    if (bookmarksQuery.data) {
      queryClient.invalidateQueries({ queryKey: ["Pokemon"] });
    }
  }, [bookmarksQuery.data, queryClient]);

  const pokemonDetails = pokemonQueries
    .map((result) => result.data)
    .filter(
      (pokemon): pokemon is TranslatedKoreanData => pokemon !== undefined
    );

  // 전체 상태를 통합하여 하나의 상태로 반환
  const status: "pending" | "error" | "success" =
    bookmarksQuery.status === "pending" ||
    pokemonQueries.some((result) => result.status === "pending")
      ? "pending"
      : pokemonQueries.some((result) => result.status === "error")
      ? "error"
      : "success";

  return {
    data: pokemonDetails,
    status,
  };
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
