import { UserProfile } from "@/types/supabaseTypes";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  user: UserProfile | null;
  onClick: () => void;
}

function Header({ user, onClick }: PropsWithChildren<HeaderProps>) {
  return (
    <header className="border-b border-black bg-gray-900 ">
      <div className="container mx-auto max-x-[1024px] px-5 h-16 flex items-center">
        <Link to={"/"} className="text-3xl font-bold text-red-500">
          MOVIE MATE
        </Link>
        <nav className="ml-20 text-white">
          <ul className="flex gap-x-8">
            <li className="px-4 py-2 hover:bg-gray-700 rounded text-ellipsis">
              <Link to="/">영화 목록</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 rounded text-ellipsis">
              <Link to="/">즐겨찾기</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 rounded text-ellipsis">
              <Link to="/">영화 추천 설문</Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto mr-8 text-white">
          <ul className="flex gap-x-8">
            {user ? (
              <>
                <li className="px-4 py-2 hover:bg-gray-700 rounded text-ellipsis">
                  <Link to="/mypage">마이페이지</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 rounded text-ellipsis">
                  <button onClick={onClick}>로그아웃</button>
                </li>
              </>
            ) : (
              <>
                <li className="text-ellipsis">
                  <Link to="/auth/login">로그인</Link>
                </li>
                <li className="text-ellipsis">
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
