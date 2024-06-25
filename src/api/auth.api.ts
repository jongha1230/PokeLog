import { PostgrestError, User } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import supabase from "./supabaseAPI";

class AuthAPI {
  // 회원가입
  async signUp(
    email: string,
    password: string,
    nickname: string
  ): Promise<{
    signUpData: { user: User | null };
    userData: Database["public"]["Tables"]["users"]["Row"] | null;
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

      // users 테이블에 사용자 정보 추가
      const { data: userData, error: userError } = (await supabase
        .from("users")
        .insert([{ id: userId, email, nickname }])
        .select()
        .single()) as {
        data: Database["public"]["Tables"]["users"]["Row"] | null;
        error: PostgrestError | null;
      };

      // 사용자 정보 추가 오류 처리
      if (userError) {
        throw new Error(userError.message);
      }

      return { signUpData: { user: signUpData.user }, userData };
    } catch (error) {
      throw new Error(`Sign-up failed: ${(error as Error).message}`);
    }
  }
}

export default AuthAPI;
