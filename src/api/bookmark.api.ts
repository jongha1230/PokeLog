import { Tables } from "@/types/supabase";
import supabase from "./supabaseAPI";

class BookmarkAPI {
  // 북마크 조회
  async getBookmarks(userId: string) {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("userId", userId);

    if (error) throw new Error(error.message);
    return data as Tables<"bookmarks">[];
  }

  // 북마크 생성
  async createBookmarks(bookmark: Tables<"bookmarks">) {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert<Tables<"bookmarks">>(bookmark);

    if (error) throw new Error(error.message);
    return data;
  }

  // 북마크 삭제
  async deleteBookmark(bookmarkId: number) {
    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", bookmarkId);

    if (error) throw new Error(error.message);
    return data;
  }
}

export default BookmarkAPI;
