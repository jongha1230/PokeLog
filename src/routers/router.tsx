import { authLoader } from "@/components/shared/utils/authLoader";
import { BookMarkListPage, MovieDetailPage } from "@/pages";
import MainPage from "@/pages/MainPage/MainPage";
import MainLayout from "@/styles/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { LoginForm, SignUpForm } from "../components";
import { AuthPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/movie/:movieId", element: <MovieDetailPage /> },
      { path: "/bookmark", element: <BookMarkListPage />, loader: authLoader },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <SignUpForm /> },
    ],
  },
]);

export default router;
