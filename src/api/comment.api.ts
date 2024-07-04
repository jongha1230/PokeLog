import { Tables } from "@/types/supabase";
import { CommentWithUser } from "@/types/supabaseTypes";
import supabase from "./supabaseAPI";

class CommentAPI {
  // 댓글 목록 조회
  async getComments(pokemonId: string): Promise<CommentWithUser[]> {
    try {
      console.log("Fetching comments for pokemonId:", pokemonId);

      const { data, error } = await supabase
        .from("comments")
        .select("*, user:users!comments_userId_fkey(nickname, profile_picture)")
        .eq("pokemonId", pokemonId)
        .returns<CommentWithUser[]>();

      console.log("Query result:", { data, error });

      if (error) {
        throw error;
      }

      return data as CommentWithUser[];
    } catch (error) {
      console.error("Error in getComments:", error);
      throw new Error(
        `리뷰 목록 조회중 오류 발생: ${(error as Error).message}`
      );
    }
  }

  // 댓글 작성
  async createComment(
    comments: Tables<"comments">
  ): Promise<Tables<"comments">> {
    try {
      const { pokemonId, userId, comment, rating } = comments;

      if (!userId || !pokemonId || !comment || rating === undefined) {
        throw new Error("항목을 다 작성하지 않았습니다.");
      }

      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            userId,
            pokemonId,
            comment,
            rating,
          },
        ])
        .select()
        .returns<Tables<"comments">[]>();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("작성에 실패했습니다.");
      }

      return data[0];
    } catch (error) {
      throw new Error(`작성 중 오류 발생: ${(error as Error).message}`);
    }
  }

  // 댓글 수정
  async updateComment(review: Tables<"comments">): Promise<Tables<"comments">> {
    try {
      const { id, comment, rating } = review;
      console.log(id);

      if (!comment || rating === undefined) {
        throw new Error("항목을 다 작성하지 않았습니다.");
      }

      const { data, error } = await supabase
        .from("comments")
        .update([
          {
            comment,
            rating,
          },
        ])
        .eq("id", id)
        .select()
        .returns<Tables<"comments">[]>();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("리뷰 수정을 실패했습니다.");
      }

      return data[0];
    } catch (error) {
      throw new Error(`리뷰 작성 중 오류 발생: ${(error as Error).message}`);
    }
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);
      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      throw new Error(`리뷰 삭제 중  오류 발생: ${(error as Error).message}`);
    }
  }
}

export default CommentAPI;
