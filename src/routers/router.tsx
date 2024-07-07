import { authLoader } from "@/components/shared/utils/authLoader";
import {
  BookMarkListPage,
  PokemonDetailPage,
  RecommendPokemonPage,
} from "@/pages";
import MainPage from "@/pages/MainPage/MainPage";
import PokeLog from "@/styles/PokeLog";
import { createBrowserRouter } from "react-router-dom";
import { LoginForm, SignUpForm } from "../components";
import { AuthPage } from "../pages";
import AuthCallback from "./AuthCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokeLog />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/pokemon/:id", element: <PokemonDetailPage /> },
      { path: "/bookmark", element: <BookMarkListPage />, loader: authLoader },
      { path: "/recommend", element: <RecommendPokemonPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignUpForm /> },
      { path: "callback", element: <AuthCallback /> },
    ],
  },
]);

export default router;
