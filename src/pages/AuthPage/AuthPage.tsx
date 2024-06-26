import { Outlet } from "react-router";

function AuthPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-800">
      <Outlet />
    </div>
  );
}

export default AuthPage;
