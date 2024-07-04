import api from "@/api";
import { Tables } from "@/types/supabase";
import { CommentWithUser } from "@/types/supabaseTypes";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 댓글 목록 불러오기
export const useGetComments = (pokemonId: string) => {
  return useQuery<CommentWithUser[]>({
    queryKey: ["comment"],
    queryFn: async () => {
      const data = await api.comment.getComments(pokemonId);
      return data;
    },
  });
};

//  댓글 작성
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: Tables<"comments">) => {
      const result = await api.comment.createComment(comment);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.error("댓글 생성 도중 에러 발생:", error);
    },
  });
};

//  댓글 업데이트
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (comment: Tables<"comments">) => {
      const result = await api.comment.updateComment(comment);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.error("댓글 수정 중 에러 발생:", error);
    },
  });
};

// 댓글 삭제(낙관적 업데이트 예정)
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: number) => {
      const result = await api.comment.deleteComment(commentId);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
};
