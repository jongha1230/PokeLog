import { StarRating } from "@/components/common";
import {
  useCreateComment,
  useUpdateComment,
} from "@/components/shared/hooks/useComments";
import { Tables } from "@/types/supabase";
import { useState } from "react";

interface CommentFormProps {
  pokemonId: string;
  editingComment?: Tables<"comments"> | null;
  onSave: () => void;
  onCancelEdit: () => void;
  user: {
    email: string;
    id: string;
    nickname: string;
    profile_picture: string | null;
  } | null;
}

const ReviewForm = ({
  pokemonId,
  editingComment,
  onSave,
  onCancelEdit,
  user,
}: CommentFormProps) => {
  const [commentText, setCommentText] = useState(
    editingComment ? editingComment.comment : ""
  );
  const [rating, setRating] = useState(
    editingComment ? editingComment.rating : 0
  );
  const { mutate: createComment, isPending: commentLoading } =
    useCreateComment();
  const { mutate: updateComment } = useUpdateComment();

  const handleSubmit = () => {
    if (!user?.id || !pokemonId) {
      console.error("사용자 정보 또는 영화 정보가 유효하지 않습니다.");
      return;
    }

    if (commentText.trim().length === 0) {
      console.error("리뷰 내용을 입력해주세요.");
      return;
    }

    if (commentText.length > 500) {
      console.error("리뷰는 500자를 초과할 수 없습니다.");
      return;
    }

    if (editingComment) {
      const updatedReview: Tables<"comments"> = {
        ...editingComment,
        comment: commentText,
        rating,
      };
      updateComment(updatedReview);
    } else {
      const comments: Tables<"comments"> = {
        userId: user.id,
        pokemonId,
        comment: commentText,
        rating,
      };
      createComment(comments);
    }

    setCommentText("");
    setRating(0);
    onSave();
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-4 flex flex-col items-start">
        <StarRating rating={rating} setRating={setRating} />
        <textarea
          className="p-2 mt-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 overflow-y-hidden w-full min-w-[300px] md:min-w-[400px] lg:min-w-[500px] resize-none"
          rows={5}
          placeholder="댓글을 작성하세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button
          className="mt-2 px-4 py-2 bg-red-700 rounded text-white transition duration-300 hover:bg-red-600 hover:text-gray-200"
          onClick={handleSubmit}
          disabled={commentLoading}
        >
          {commentLoading ? "작성 중..." : "작성"}
        </button>
        {editingComment && (
          <button
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            onClick={onCancelEdit}
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
