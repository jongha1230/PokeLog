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

export type MovieResponse<IsDetail extends boolean = true> = {
  results: Movie[];
} & (IsDetail extends false
  ? {
      page: number;
      total_pages: number;
      total_results: number;
    }
  : Record<string, never>);
