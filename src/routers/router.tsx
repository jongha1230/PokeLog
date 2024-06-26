import { createBrowserRouter } from "react-router-dom";
import { LoginForm, SignUpForm } from "../components";
import { AuthPage } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    children: [
      { path: "", element: <LoginForm /> },
      { path: "signup", element: <SignUpForm /> },
    ],
  },
]);

export default router;
