import { InfiniteData } from "@tanstack/react-query";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  popularity: number;
  original_title?: string;
  release_date?: string;
  genre_ids?: number[];
  genres?: Genre[];
  vote_average: number;
  vote_count?: number;
  original_language?: string;
  adult?: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieDetailResponse = {
  results: Movie[];
};

type BaseProps = {
  data: InfiniteData<MovieResponse> | Movie[] | undefined;
  status: "pending" | "error" | "success";
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

export type MovieListProps = BaseProps & (InfiniteProps | NonInfiniteProps);
