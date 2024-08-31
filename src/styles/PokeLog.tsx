import { Header } from "@/components/common";
import { useAuthStore } from "@/store/authStore";
import { Outlet } from "react-router";

function PokeLog() {
  const { user, signOut } = useAuthStore();

  return (
    <div className="items-center justify-center max-w-[1440px] min-h-screen mx-auto bg-[#f7f9f7] text-black">
      {/* Header */}
      <Header user={user} signOut={signOut} />

      <div className="flex flex-col md:flex-row ">
        {/* 왼쪽 */}
        <div className="w-full p-4 rounded-lg min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PokeLog;
