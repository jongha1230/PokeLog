import { PostgrestError, User } from "@supabase/supabase-js";

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
    userData: UserProfile | null;
  }> {
    try {
      // 회원가입 요청
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      // 회원가입 오류 처리
      if (signUpError) {
        throw new Error(signUpError.message);
      }

      const userId = signUpData.user?.id;

      // 사용자 ID가 없을 경우 오류 처리
      if (!userId) {
        throw new Error("User ID not found after sign-up.");
      }
      console.log(userId);
      // users 테이블에 사용자 정보 추가
      const { data: userData, error: userError } = (await supabase
        .from("users")
        .insert([{ id: userId, email, nickname }])
        .select()
        .single()) as {
        data: UserProfile | null;
        error: PostgrestError | null;
      };

      // 사용자 정보 추가 오류 처리
      if (userError) {
        throw new Error(userError.message);
      }

      return { signUpData, userData };
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
