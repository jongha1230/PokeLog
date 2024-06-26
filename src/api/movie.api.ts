import { AxiosInstance } from "axios";

class MovieAPI {
  private axios: AxiosInstance;
  private API_KEY: string;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.API_KEY = import.meta.env.VITE_MOVIE_KEY as string;
  }

  // 인기순 영화 데이터
  fetchPopularMovies = async (page: number) => {
    const response = await this.axios.get(`/movie/popular`, {
      params: {
        api_key: this.API_KEY,
        page: page,
      },
    });
    const data = response.data;

    return data;
  };
}

export default MovieAPI;
