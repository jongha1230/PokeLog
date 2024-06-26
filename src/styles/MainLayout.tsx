import { Header } from "@/components/common";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router";

function MainLayout() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="w-screen h-screen bg-slate-800">
      {/* 헤더 */}
      <Header user={user} onClick={signOut} />
      <Outlet />
    </div>
  );
  // return <Link to={"/login"}>로그인</Link>;
}

export default MainLayout;
