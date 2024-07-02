import {
  useDeleteReview,
  useGetReviews,
} from "@/components/shared/hooks/useReview";
import { ReviewUpdate } from "@/types/supabaseTypes";

interface ReviewListProps {
  movieId: string;
  onEdit: (review: ReviewUpdate) => void;
}

const ReviewList = ({ movieId, onEdit }: ReviewListProps) => {
  const { data: reviews, isLoading: reviewsLoading } = useGetReviews(movieId);
  const { mutate: deleteReview } = useDeleteReview();

  if (reviewsLoading) return <p>리뷰 로딩 중...</p>;

  return (
    <div className="mt-4 max-h-[400px] custom-scrollbar overflow-y-auto">
      <div className="flex flex-col items-center">
        <ul className="w-3/4">
          {reviews
            ?.sort((a, b) => {
              if (!a.created_at || !b.created_at) return 0;
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            })
            .map((review) => (
              <li key={review.id} className="mt-2">
                <div className="p-2 bg-gray-800 rounded flex justify-between items-center">
                  <div className="w-full ml-4">
                    <div className="w-full flex justify-between">
                      <div>
                        <p className="font-bold">{review.user.nickname}</p>
                        {review.rating && (
                          <p className="text-yellow-500 py-2">
                            {Array.from({ length: review.rating }, (_, i) => (
                              <span key={i}>&#9733;</span>
                            ))}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mr-4">
                        {review.created_at &&
                          new Date(review.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-full flex flex-col justify-between">
                      <p className="py-2">{review.review}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => onEdit(review)}
                        >
                          수정
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                          onClick={() => deleteReview(review.id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewList;
