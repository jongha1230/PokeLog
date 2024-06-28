import { Movie, MovieResponse } from "@/types/MovieType";
import { AxiosInstance } from "axios";

class MovieAPI {
  private axios: AxiosInstance;
  private API_KEY: string;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.API_KEY = import.meta.env.VITE_MOVIE_KEY as string;
  }
  // 인기 영화
  fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await this.axios.get("/movie/popular", {
      params: { api_key: this.API_KEY, page, language: "ko-KR" },
    });
    return response.data;
  };
  // 현재 상영 영화
  fetchNowPlayingMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await this.axios.get("/movie/now_playing", {
      params: { api_key: this.API_KEY, page, language: "ko-KR" },
    });
    return response.data;
  };
  // 상영 예정 영화
  fetchUpcomingMovies = async (page: number = 1): Promise<MovieResponse> => {
    const response = await this.axios.get("/movie/upcoming", {
      params: { api_key: this.API_KEY, page, language: "ko-KR" },
    });
    return response.data;
  };
  // 영화 항목
  fetchMovieDetails = async (movieId: number): Promise<Movie> => {
    const response = await this.axios.get(`/movie/${movieId}`, {
      params: { api_key: this.API_KEY, language: "ko-KR" },
    });
    return response.data;
  };
  // 검색 데이터
  searchMovies = async (
    query: string,
    page: number = 1
  ): Promise<MovieResponse> => {
    const response = await this.axios.get("/search/movie", {
      params: { api_key: this.API_KEY, query, page, language: "ko-KR" },
    });
    return response.data;
  };
}

export default MovieAPI;
