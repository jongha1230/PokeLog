import { InfiniteData } from "@tanstack/react-query";

export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: PokemonType[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
  species: { url: string }; // 추가된 부분
  url: string;
};

export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type PokemonDetailResponse = {
  results: Pokemon[];
};

type Language = {
  name: string;
  url: string;
};

export type Name = {
  name: string;
  language: Language;
};

type Type = {
  name: string;
  url: string;
  korean_name?: string;
};

export type TypeDetail = {
  names: Name[];
};

export type PokemonType = {
  slot: number;
  type: Type;
};

export type Species = {
  names: Name[];
};

type BaseProps = {
  data: InfiniteData<PokemonResponse> | Pokemon[] | undefined;
  status: "pending" | "error" | "success";
  title: string;
};

type InfiniteProps = {
  isInfinite: true;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

type NonInfiniteProps = {
  isInfinite?: false;
  fetchNextPage?: never;
  hasNextPage?: never;
  isFetchingNextPage?: never;
};

export type PokemonListProps = BaseProps & (InfiniteProps | NonInfiniteProps);
