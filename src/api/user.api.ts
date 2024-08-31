import { UserProfile } from "@/types/supabaseTypes";
import supabase from "./supabaseAPI";

class UserAPI {
  // 유저 정보 조회
  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }
  // 프로필 파일 수정
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
  // 회원 탈퇴
  async deleteAccount(userId: string) {
    try {
      const { error } = await supabase.from("users").delete().eq("id", userId);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw error;
    }
  }
  // 비밀번호 변경
  async changePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }

  // 이메일 변경
  async changeEmail(newEmail: string) {
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;
    } catch (error) {
      console.error("Error changing email:", error);
      throw error;
    }
  }

  async updateUserProfile(
    userId: string,
    updates: { nickname?: string; image_url?: string }
  ) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}

export default UserAPI;
