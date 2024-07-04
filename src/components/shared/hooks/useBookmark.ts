import api from "@/api";
import { Tables } from "@/types/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 북마크 목록 불러오기
export const useGetBookmarks = (userId: string) => {
  return useQuery<Tables<"bookmarks">[]>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const data = await api.bookmark.getBookmarks(userId);
      return data;
    },
  });
};

//  북마크 생성 (낙관적 업데이트 예정)
export const useCreateBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookmark: Tables<"bookmarks">) => {
      const result = await api.bookmark.createBookmarks(bookmark);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error) => {
      console.error("북마크 추가 도중 에러 발생:", error);
    },
  });
};

// 북마크 삭제
export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookmarkId: number) => {
      const result = await api.bookmark.deleteBookmark(bookmarkId);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};
