import { BookmarkInsert, BookmarkRow } from "@/types/supabaseTypes";
import supabase from "./supabaseAPI";

class BookmarkAPI {
  // 북마크 조회
  async getBookmarks(userId: string) {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data as BookmarkRow[];
  }

  // 북마크 생성
  async createBookmarks(bookmark: BookmarkInsert) {
    const { data, error } = await supabase
      .from("bookmarks")
      .insert<BookmarkInsert>(bookmark);

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
