import api from "@/api";
import { ReviewInsert, ReviewRow } from "@/types/supabaseTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 리뷰 목록 불러오기

export const useGetReviews = (movie_id: string) => {
  return useQuery<ReviewRow[]>({
    queryKey: ["reviews", movie_id],
    queryFn: async () => {
      const data = await api.review.getReviews(movie_id);
      return data;
    },
  });
};

//  리뷰 작성
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review: ReviewInsert) => {
      const result = await api.review.createReview(review);
      return result;
    },
    onSuccess: (data) => {
      console.log("리뷰 작성 성공:", data);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("리뷰 생성 도중 에러 발생:", error);
    },
  });
};
