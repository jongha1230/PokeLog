import api from "@/api";
import { ReviewInsert, ReviewRow, ReviewUpdate } from "@/types/supabaseTypes";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("리뷰 생성 도중 에러 발생:", error);
    },
  });
};

//  리뷰 업데이트
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (review: ReviewUpdate) => {
      const result = await api.review.updateReview(review);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("리뷰 수정 중 에러 발생:", error);
    },
  });
};

// 리뷰 삭제
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewId: number) => {
      const result = await api.review.deleteReview(reviewId);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};
