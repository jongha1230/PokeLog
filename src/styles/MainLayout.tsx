import { Header } from "@/components/common";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router";

function MainLayout() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="main-layout min-h-screen bg-pokemon-image bg-fixed bg-current bg-center">
      {/* 헤더 */}
      <Header user={user} signOut={signOut} />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
  // return <Link to={"/login"}>로그인</Link>;
}

export default MainLayout;
