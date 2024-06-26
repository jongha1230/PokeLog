export interface Movie {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  genre_ids?: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language?: string;
  adult?: boolean;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
