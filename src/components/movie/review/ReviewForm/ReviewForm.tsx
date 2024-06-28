import { StarRating } from "@/components/common";
import {
  useCreateReview,
  useUpdateReview,
} from "@/components/shared/hooks/useReview";
import { ReviewInsert, ReviewUpdate } from "@/types/supabaseTypes";
import { useState } from "react";

interface ReviewFormProps {
  movieId: string;
  editingReview?: ReviewUpdate | null;
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
  movieId,
  editingReview,
  onSave,
  onCancelEdit,
  user,
}: ReviewFormProps) => {
  const [reviewText, setReviewText] = useState(
    editingReview ? editingReview.review : ""
  );
  const [rating, setRating] = useState(
    editingReview ? editingReview.rating : 0
  );
  const { mutate: createReview, isPending: reviewLoading } = useCreateReview();
  const { mutate: updateReview } = useUpdateReview();

  const handleSubmit = () => {
    if (!user?.id || !movieId) {
      console.error("사용자 정보 또는 영화 정보가 유효하지 않습니다.");
      return;
    }

    if (reviewText.trim().length === 0) {
      console.error("리뷰 내용을 입력해주세요.");
      return;
    }

    if (reviewText.length > 500) {
      console.error("리뷰는 500자를 초과할 수 없습니다.");
      return;
    }

    if (editingReview) {
      const updatedReview: ReviewUpdate = {
        ...editingReview,
        review: reviewText,
        rating,
      };
      updateReview(updatedReview);
    } else {
      const review: ReviewInsert = {
        user_id: user.id,
        movie_id: movieId,
        review: reviewText,
        rating,
      };
      createReview(review);
    }

    setReviewText("");
    setRating(0);
    onSave();
  };

  return (
    <div className="mt-4 flex flex-col items-start">
      <StarRating rating={rating} setRating={setRating} />
      <textarea
        className="w-3/4 p-2 mt-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700"
        rows={5}
        placeholder="리뷰를 작성하세요..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      <button
        className="mt-2 px-4 py-2 bg-red-700 rounded text-white transition duration-300 hover:bg-red-600 hover:text-gray-200"
        onClick={handleSubmit}
        disabled={reviewLoading}
      >
        {reviewLoading ? "작성 중..." : "작성"}
      </button>
      {editingReview && (
        <button
          className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          onClick={onCancelEdit}
        >
          취소
        </button>
      )}
    </div>
  );
};

export default ReviewForm;
