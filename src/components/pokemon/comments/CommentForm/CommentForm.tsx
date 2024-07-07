import { Button, StarRating } from "@/components/common";
import { useCreateComment } from "@/components/shared/hooks/useComments";
import { Tables } from "@/types/supabase";
import { useState } from "react";

interface CommentFormProps {
  pokemonId: string;
  user: {
    email: string;
    id: string;
    nickname: string;
    profile_picture: string | null;
  } | null;
  onSave: () => void;
}

const CommentForm = ({ pokemonId, user, onSave }: CommentFormProps) => {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const { mutate: createComment, isPending: commentLoading } =
    useCreateComment();

  const handleSubmit = () => {
    if (!user?.id || !pokemonId) {
      console.error("사용자 정보 또는 포켓몬 정보가 유효하지 않습니다.");
      return;
    }

    if (commentText.trim().length === 0) {
      console.error("댓글내용을 입력해주세요.");
      return;
    }

    if (commentText.length > 500) {
      console.error("댓글은 500자를 초과할 수 없습니다.");
      return;
    }

    const newComment: Tables<"comments"> = {
      userId: user.id,
      pokemonId,
      comment: commentText,
      rating,
    };
    createComment(newComment);

    setCommentText("");
    setRating(0);
    onSave();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-start">
        <StarRating rating={rating} setRating={setRating} />
        <textarea
          className="p-2 my-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700 overflow-y-hidden w-full min-w-[300px] md:min-w-[400px] lg:min-w-[500px] resize-none"
          rows={4}
          placeholder="댓글을 작성하세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <Button
          intent={"red"}
          size={"md"}
          onClick={handleSubmit}
          disabled={commentLoading}
        >
          {commentLoading ? "작성 중..." : "작성"}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
