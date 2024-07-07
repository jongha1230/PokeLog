import { Button, StarRating } from "@/components/common";
import {
  useDeleteComment,
  useGetComments,
  useUpdateComment,
} from "@/components/shared/hooks/useComments";
import { useAuthStore } from "@/store/authStore";
import { Tables } from "@/types/supabase";
import { useEffect, useRef, useState } from "react";

interface CommentListProps {
  pokemonId: string;
}

const CommentList = ({ pokemonId }: CommentListProps) => {
  const { data: comments, isLoading: commentsLoading } =
    useGetComments(pokemonId);
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const editTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (editingCommentId !== null && editTextAreaRef.current) {
      editTextAreaRef.current.focus();
    }
  }, [editingCommentId]);

  if (commentsLoading) return <p>로딩 중...</p>;

  const handleEdit = (comment: Tables<"comments">) => {
    setEditingCommentId(comment.id as number);
    setEditedComment(comment.comment);
    setEditedRating(comment.rating || 0);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
    setEditedRating(0);
  };

  const handleSaveEdit = (comment: Tables<"comments">) => {
    if (editedComment.trim().length === 0) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (editedComment.length > 500) {
      alert("댓글은 500자를 초과할 수 없습니다.");
      return;
    }
    const updatedComment: Tables<"comments"> = {
      ...comment,
      comment: editedComment,
      rating: editedRating,
    };
    updateComment(updatedComment);
    setEditingCommentId(null);
  };

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
                  <p className="font-bold text-lg text-white">
                    {comment.user.nickname}
                  </p>
                  {!editingCommentId && comment.rating && (
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
              {editingCommentId === comment.id ? (
                <div>
                  <StarRating
                    rating={editedRating}
                    setRating={setEditedRating}
                  />
                  <textarea
                    className="w-full p-2 mt-2 bg-gray-700 overflow-y-hidden  text-white rounded resize-none"
                    rows={2}
                    ref={editTextAreaRef}
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      intent={"green"}
                      onClick={() => handleSaveEdit(comment)}
                    >
                      등록
                    </Button>
                    <Button intent={"red"} onClick={handleCancelEdit}>
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 mb-4 text-white">{comment.comment}</p>
              )}
              {user &&
                user.id === comment.userId &&
                editingCommentId !== comment.id && (
                  <div className="flex justify-end space-x-2">
                    <Button size={"md"} onClick={() => handleEdit(comment)}>
                      수정
                    </Button>
                    <Button
                      intent={"red"}
                      size={"md"}
                      onClick={() => deleteComment(comment.id as number)}
                    >
                      삭제
                    </Button>
                  </div>
                )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;
