import {
  ReviewInsert,
  ReviewUpdate,
  ReviewWithUser,
} from "@/types/supabaseTypes";
import supabase from "./supabaseAPI";

class ReviewAPI {
  // 리뷰 목록 조회
  async getReviews(movie_id: string): Promise<ReviewWithUser[]> {
    try {
      // 영화 ID에 해당하는 리뷰 목록을 조회하며, 각 리뷰 작성자의 닉네임과 프로필 사진도 함께 가져옴
      const { data, error } = await supabase
        .from("reviews")
        .select("*, user:users(nickname, profile_picture)")
        .eq("movie_id", movie_id)
        .returns<ReviewWithUser[]>();

      if (error) {
        throw error;
      }

      return data as ReviewWithUser[];
    } catch (error) {
      throw new Error(
        `리뷰 목록 조회중 오류 발생: ${(error as Error).message}`
      );
    }
  }

  // 리뷰 작성
  async createReview(review: ReviewInsert): Promise<ReviewInsert> {
    try {
      const { user_id, movie_id, review: reviewText, rating } = review;

      if (!user_id || !movie_id || !reviewText || rating === undefined) {
        throw new Error("리뷰 항목을 다 작성하지 않았습니다.");
      }

      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            user_id,
            movie_id,
            review: reviewText,
            rating,
          },
        ])
        .select()
        .returns<ReviewInsert[]>();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("리뷰 작성에 실패했습니다.");
      }

      return data[0];
    } catch (error) {
      throw new Error(`리뷰 작성 중 오류 발생: ${(error as Error).message}`);
    }
  }

  // 리뷰 수정
  async updateReview(review: ReviewUpdate): Promise<ReviewUpdate> {
    try {
      const { id, review: reviewText, rating } = review;
      console.log(id);

      if (!reviewText || rating === undefined) {
        throw new Error("리뷰 항목을 다 작성하지 않았습니다.");
      }

      const { data, error } = await supabase
        .from("reviews")
        .update([
          {
            review: reviewText,
            rating,
          },
        ])
        .eq("id", id)
        .select()
        .returns<ReviewInsert[]>();

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

  // 리뷰 삭제
  async deleteReview(reviewId: number) {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);
      if (error) {
        throw error;
      }
      return true;
    } catch (error) {
      throw new Error(`리뷰 삭제 중  오류 발생: ${(error as Error).message}`);
    }
  }
}

export default ReviewAPI;
