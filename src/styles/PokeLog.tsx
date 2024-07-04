import { Header } from "@/components/common";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function PokeLog() {
  const { user, signOut } = useAuthStore();

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="items-center justify-center max-w-[1440px] min-h-screen mx-auto bg-gray-900 text-black">
      {/* Header */}
      <Header user={user} signOut={signOut} />

      <div className="flex flex-col md:flex-row bg-gray-700">
        {/* 왼쪽 */}
        <div className="w-full md:w-2/3 p-4 bg-gray-800 rounded-lg shadow-lg min-h-screen">
          <Outlet />
        </div>

        {/* 오른쪽 */}
        <div className="p-4 bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3 h-full sticky top-4">
          {showButton && (
            <div className="flex justify-center mb-4">
              <button
                onClick={scrollToTop}
                className="bg-blue-500 text-white px-4 py-2 text-[20px] rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                To the top
              </button>
            </div>
          )}
          {/* 스크린 */}
          <div className="w-full h-48 bg-cover bg-pokemon-image bg-center rounded-lg mb-4"></div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md h-full overflow-y-auto">
            {/* Menu Title */}
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              메뉴
            </h2>
            <nav className="flex flex-wrap gap-x-2 items-center justify-center">
              <Link
                to="/"
                className="block bg-blue-500 w-2/5 text-white py-2 rounded-lg mb-2 text-center hover:brightness-90"
              >
                홈
              </Link>
              <Link
                to="/bookmark"
                className="block bg-green-500 w-2/5 text-white py-2 rounded-lg mb-2 text-center hover:brightness-90"
              >
                북마크
              </Link>
              <Link
                to="/auth/login"
                className="block bg-red-500 w-2/5 text-white py-2 rounded-lg mb-2 text-center hover:brightness-90"
              >
                로그인
              </Link>
              <Link
                to="/auth/signup"
                className="block bg-yellow-500 w-2/5 text-white py-2 rounded-lg mb-2 text-center hover:brightness-90"
              >
                회원가입
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokeLog;
