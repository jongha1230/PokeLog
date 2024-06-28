import { Header } from "@/components/common";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router";

function MainLayout() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="main-layout bg-gray-900  min-h-screen">
      {/* 헤더 */}
      <Header user={user} onClick={signOut} />
      <main className="bg-slate-800">
        <Outlet />
      </main>
    </div>
  );
  // return <Link to={"/login"}>로그인</Link>;
}

export default MainLayout;
