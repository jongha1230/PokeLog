import { ReviewInsert } from "@/types/supabaseTypes";
import supabase from "./supabaseAPI";

class ReviewAPI {
  async createReview(review: ReviewInsert): Promise<ReviewInsert> {
    try {
      const { user_id, movie_id, review: reviewText, rating } = review;

      if (!user_id || !movie_id || !reviewText || rating === undefined) {
        throw new Error("리뷰 항목을 다 작성하지 않았습니다.");
      }

      const { data, error } = await supabase.from("reviews").insert([
        {
          user_id,
          movie_id,
          review: reviewText,
          rating,
        },
      ]);

      if (error) {
        throw error;
      }

      return data[0];
    } catch (error) {
      throw new Error(`리뷰 작성 중 오류 발생: ${(error as Error).message}`);
    }
  }
}

export default ReviewAPI;
