import {
  useDeleteComment,
  useGetComments,
} from "@/components/shared/hooks/useComments";
import { Tables } from "@/types/supabase";

interface CommentListProps {
  pokemonId: string;
  onEdit: (review: Tables<"comments">) => void;
}

const CommentList = ({ pokemonId, onEdit }: CommentListProps) => {
  const { data: comments, isLoading: commentsLoading } =
    useGetComments(pokemonId);
  const { mutate: deleteComment } = useDeleteComment();

  console.log(comments);
  if (commentsLoading) return <p> 로딩 중...</p>;

  return (
    <div className="mt-4 max-h-[200px] overflow-y-auto pr-4 custom-scrollbar">
      <ul className="space-y-4">
        {comments
          ?.sort((a, b) => {
            if (!a.createdAt || !b.createdAt) return 0;
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((comment) => (
            <li
              key={comment.id}
              className="bg-gray-500/50 rounded-lg p-4 shadow-md"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-lg">{comment.user.nickname}</p>
                  {comment.rating && (
                    <p className="text-yellow-500">
                      {Array.from({ length: comment.rating }, (_, i) => (
                        <span key={i}>&#9733;</span>
                      ))}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-400">
                  {comment.createdAt &&
                    new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-2 mb-4">{comment.comment}</p>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => onEdit(comment)}
                >
                  수정
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={() => deleteComment(comment.id as number)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;
