import { Provider, User } from "@supabase/supabase-js";

import { SignUpResponse } from "@/types/supabaseTypes";
import supabase from "./supabaseAPI";
class AuthAPI {
  //회원가입
  async signUp(
    email: string,
    password: string,
    nickname: string
  ): Promise<{
    signUpData: SignUpResponse;
  }> {
    try {
      // 회원가입 요청
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nickname,
            },
          },
        });

      // 회원가입 오류 처리
      if (signUpError) {
        throw new Error(signUpError.message);
      }

      return { signUpData };
    } catch (error) {
      throw new Error(`Sign-up failed: ${(error as Error).message}`);
    }
  }

  // 로그인
  async signIn(email: string, password: string): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("User data is missing after successful login");
      }

      return data.user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Sign-in failed: ${error.message}`);
      } else {
        throw new Error("Sign-in failed: An unknown error occurred");
      }
    }
  }

  // 소셜 로그인
  async signInWithOAuth(platform: Provider): Promise<{
    data: { provider: Provider; url: string } | null;
    error: Error | null;
  }> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: platform,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error("OAuth sign-in error:", error);
      return {
        data: null,
        error:
          error instanceof Error ? error : new Error("Unknown error occurred"),
      };
    }
  }
}

export default AuthAPI;
