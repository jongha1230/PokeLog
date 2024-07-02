import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api";
import BookmarkAPI from "./bookmark.api";
import PokemonAPI from "./pokemon.api";
import ReviewAPI from "./review.api";

const BASE_URL = "https://pokeapi.co/api/v2";
class API {
  private axios: AxiosInstance;
  auth: AuthAPI;
  pokemon: PokemonAPI;
  review: ReviewAPI;
  bookmark: BookmarkAPI;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });

    this.auth = new AuthAPI();
    this.review = new ReviewAPI();
    this.bookmark = new BookmarkAPI();
    this.pokemon = new PokemonAPI(this.axios);
  }
}

const api = new API();
export default api;
