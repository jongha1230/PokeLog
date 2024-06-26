import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api";
import MovieAPI from "./movie.api";

const BASE_URL = "https://api.themoviedb.org/3";
class API {
  private axios: AxiosInstance;
  auth: AuthAPI;
  movie: MovieAPI;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });

    this.auth = new AuthAPI();
    this.movie = new MovieAPI(this.axios);
  }
}

const api = new API();
export default api;
