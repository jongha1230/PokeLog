import api from "@/api";
import supabase from "@/api/supabaseAPI";
import { useAuthStore } from "@/store/authStore";
import { SignUpResponse, UserProfile } from "@/types/supabaseTypes";
import { Provider } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type SignUpRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type SignUpResult = {
  signUpData: SignUpResponse;
};
// 로그인
export const useSignIn = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<UserProfile, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const user = await api.auth.signIn(email, password);
      if (!user) throw new Error("로그인 실패");

      const userProfile = await api.user.getProfile(user.id);
      if (!userProfile)
        throw new Error("사용자 프로필 가져오기에 실패했습니다.");

      return userProfile;
    },
    onSuccess: (userProfile) => {
      setUser(userProfile);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("로그인 에러:", error);
    },
  });
};
// 소셜로그인
export const useSignInWithOAuth = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<void, Error, Provider>({
    mutationFn: async (provider: Provider) => {
      await api.auth.signInWithOAuth(provider);
    },
    onSuccess: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const userProfile = await api.user.getProfile(user.id);
        console.log("윙윙", userProfile);
        setUser(userProfile);
        queryClient.invalidateQueries({ queryKey: ["auth"] });
      }
    },
    onError: (error) => {
      console.error("OAuth 로그인 에러:", error);
    },
  });
};

// 회원가입
export const useSignUp = () => {
  return useMutation<SignUpResult, Error, SignUpRequest>({
    mutationFn: async ({ email, password, nickname }) => {
      return await api.auth.signUp(email, password, nickname);
    },
    onSuccess: (data) => {
      console.log("회원가입 성공:", data);
    },
    onError: (error) => {
      console.error("회원가입 실패:", error);
    },
  });
};
