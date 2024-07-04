import { User } from "@supabase/supabase-js";

import { SignUpResponse, UserProfile } from "@/types/supabaseTypes";
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
      // Supabase의 signInWithPassword 메서드를 호출하여 로그인 시도
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // 로그인 에러 발생 시 예외 처리
      if (error) {
        throw new Error(error.message);
      }

      // data.user가 null인 경우 (로그인은 성공했지만 사용자 정보가 없는 경우) 처리
      if (!data.user) {
        throw new Error("User data is missing after successful login");
      }

      // 로그인 성공 시 사용자 정보 반환
      return data.user;
    } catch (error) {
      // 모든 예외를 잡아서 일관된 형식의 에러 메시지로 다시 던짐
      if (error instanceof Error) {
        throw new Error(`Sign-in failed: ${error.message}`);
      } else {
        throw new Error("Sign-in failed: An unknown error occurred");
      }
    }
  }
  // 유저 정보 가져오기
  async getUser(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      return data as UserProfile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }
}

export default AuthAPI;
