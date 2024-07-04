import translateToKorean from "@/components/shared/utils/translateToKorean";
import {
  Pokemon,
  PokemonResponse,
  TranslatedKoreanData,
} from "@/types/PokemonType";
import { AxiosInstance } from "axios";

class PokemonAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  // 포켓몬 리스트 데이터 (무한 스크롤용)
  fetchPokemonList = async (
    limit: number,
    offset: number
  ): Promise<PokemonResponse> => {
    const response = await this.axios.get<PokemonResponse>("/pokemon", {
      params: { offset, limit },
    });

    const results = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const pokemonDetail = await this.axios.get<Pokemon>(pokemon.url);
        const { koreanName, koreanTypes } = await translateToKorean(
          pokemonDetail.data.species.url,
          pokemonDetail.data.types,
          pokemonDetail.data.name
        );

        return {
          ...pokemonDetail.data,
          korean_name: koreanName,
          types: koreanTypes,
        };
      })
    );

    return { ...response.data, results };
  };

  // 포켓몬 세대별 리스트
  fetchPokemonListByGeneration = async (
    start: number,
    end: number,
    limit: number,
    offset: number
  ): Promise<PokemonResponse> => {
    const response = await this.axios.get<PokemonResponse>("/pokemon", {
      params: {
        offset: start - 1 + offset,
        limit: Math.min(limit, end - start + 1 - offset),
      },
    });

    const results = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const pokemonDetail = await this.axios.get<Pokemon>(pokemon.url);
        const { koreanName, koreanTypes } = await translateToKorean(
          pokemonDetail.data.species.url,
          pokemonDetail.data.types,
          pokemonDetail.data.name
        );

        return {
          ...pokemonDetail.data,
          korean_name: koreanName,
          types: koreanTypes,
        };
      })
    );

    return { ...response.data, results };
  };

  // 포켓몬 항목 데이터
  fetchPokemonData = async (id: string): Promise<TranslatedKoreanData> => {
    const response = await this.axios.get<Pokemon>(`/pokemon/${id}`);
    const { koreanName, koreanTypes, koreanAbilities, koreanStats } =
      await translateToKorean(
        response.data.species.url,
        response.data.types,
        response.data.name,
        response.data.abilities,
        response.data.stats
      );

    const image =
      response.data.sprites.other?.["official-artwork"]?.front_default ||
      response.data.sprites.front_default;

    return {
      ...response.data,
      korean_name: koreanName,
      types: koreanTypes,
      abilities: koreanAbilities || response.data.abilities,
      stats: koreanStats || response.data.stats,
      image,
    };
  };

  // 포켓몬 종 데이터
  fetchPokemonSpecies = async (id: string) => {
    const response = await this.axios.get(`/pokemon-species/${id}`);
    return response.data;
  };

  // 포켓몬 타입 데이터
  fetchPokemonType = async (type: string) => {
    const response = await this.axios.get(`/type/${type}`);
    return response.data;
  };

  // 포켓몬 능력 데이터
  fetchPokemonAbility = async (ability: string) => {
    const response = await this.axios.get(`/ability/${ability}`);
    return response.data;
  };

  // 포켓몬 기술 데이터
  fetchPokemonMove = async (move: string) => {
    const response = await this.axios.get(`/move/${move}`);
    return response.data;
  };
}

export default PokemonAPI;
