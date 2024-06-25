import { createBrowserRouter } from "react-router-dom";
import { LoginForm, SignUpForm } from "../components";
import { AuthPage } from "../pages";

const router = createBrowserRouter([
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
