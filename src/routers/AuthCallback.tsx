import supabase from "@/api/supabaseAPI";
import { useAuthStore } from "@/store/authStore";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface CustomUser {
  email: string;
  id: string;
  nickname: string;
  profile_picture: string | null;
}

const mapUserToCustomUser = (user: User): CustomUser => {
  return {
    email: user.email || "",
    id: user.id,
    nickname: user.user_metadata?.nickname || "",
    profile_picture: user.user_metadata?.avatar_url || null,
  };
};

const AuthCallback = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        navigate("/login"); // 로그인 실패 시 로그인 페이지로 리디렉션
        return;
      }

      if (user) {
        const customUser = mapUserToCustomUser(user);
        setUser(customUser);
        navigate("/");
      } else {
        navigate("/login");
      }
    };

    handleAuthChange();
  }, [setUser, navigate]);

  return <div>인증 처리 중...</div>;
};

export default AuthCallback;
