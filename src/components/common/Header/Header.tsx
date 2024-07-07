import { UserProfile } from "@/types/supabaseTypes";
import { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";
import userDefaultImage from "../../../assets/blank-profile-picture-973460_640.png";

interface HeaderProps {
  user: UserProfile | null;
  signOut: () => void;
}

function Header({ user, signOut }: PropsWithChildren<HeaderProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="border-b border-black bg-gray-900 ">
      <div className="container mx-auto max-x-[1024px] px-5 h-16 flex items-center">
        <Link
          to={"/"}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-gray-400 to-white"
        >
          Pokemon Index
        </Link>

        <div
          className="flex ml-auto mr-8 h-full text-white relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ul className="flex items-center gap-x-8">
            {user ? (
              <div className="flex items-center gap-x-4">
                <img
                  src={user.profile_picture ?? userDefaultImage}
                  alt="user-profile"
                  className="rounded-full w-10 h-10 object-cover"
                />
                <p className="text-nowrap font-semibold">{user.nickname}</p>
                <svg
                  className={`transition-transform transform ${
                    isHovered ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
                {isHovered && (
                  <ul className="absolute top-12 left-0 mt-2 w-48 bg-gray-900/95 text-white shadow-lg rounded-lg z-20 transition-transform transform duration-200">
                    <li className="p-4 border-t border-gray-700">
                      <Link
                        to="/mypage"
                        className="w-full text-left text-sm hover:bg-gray-700 hover:text-red-500 rounded-lg p-2"
                      >
                        마이 페이지
                      </Link>
                    </li>
                    <li className="p-4 border-t border-gray-700 ">
                      <button
                        onClick={signOut}
                        className="w-full text-left text-sm hover:bg-gray-700 hover:text-red-500 rounded-lg p-2"
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <>
                <li className="text-nowrap">
                  <Link to="/auth/login">로그인</Link>
                </li>
                <li className="text-nowrap">
                  <Link to="/auth/signup">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
