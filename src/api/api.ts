import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api";
import BookmarkAPI from "./bookmark.api";
import CommentAPI from "./comment.api";
import PokemonAPI from "./pokemon.api";
import UserAPI from "./user.api";

const BASE_URL = "https://pokeapi.co/api/v2";
class API {
  private axios: AxiosInstance;
  auth: AuthAPI;
  pokemon: PokemonAPI;
  comment: CommentAPI;
  bookmark: BookmarkAPI;
  user: UserAPI;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });

    this.auth = new AuthAPI();
    this.comment = new CommentAPI();
    this.bookmark = new BookmarkAPI();
    this.user = new UserAPI();
    this.pokemon = new PokemonAPI(this.axios);
  }
}

const api = new API();
export default api;
