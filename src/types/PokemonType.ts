import { InfiniteData } from "@tanstack/react-query";

export type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
    image?: string;
  };
  types: PokemonType[];
  abilities: Ability[];
  stats: Stat[];
  moves: { move: { name: string; korean_name: string } }[];
  species: { url: string };
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

export type Ability = {
  ability: {
    name: string;
    url: string;
    korean_name?: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
    korean_name?: string;
  };
};

export type TypeDetail = {
  names: Name[];
};

export type AbilityDetail = {
  names: Name[];
};

export type StatDetail = {
  names: Name[];
};

export type PokemonType = {
  slot: number;
  type: Type;
};

export type TranslatedKoreanData = Pokemon & {
  korean_name: string;
  image: string;
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
