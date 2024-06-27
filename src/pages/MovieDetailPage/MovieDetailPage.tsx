import { StarRating } from "@/components/common";
import { useGetMovieDetails } from "@/components/shared/hooks/useMovies";
import {
  useCreateReview,
  useGetReviews,
} from "@/components/shared/hooks/useReview";
import { useAuthStore } from "@/store/authStore";
import { Genre } from "@/types/MovieType";
import { ReviewInsert } from "@/types/supabaseTypes";
import { useState } from "react";
import { useParams } from "react-router";

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movieData, status } = useGetMovieDetails(Number(movieId));
  const { data: reviews, isLoading: reviewsLoading } = useGetReviews(
    movieId || ""
  );
  const { mutate: createReview, isPending: reviewLoading } = useCreateReview();
  const [activeTab, setActiveTab] = useState("details");
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const user = useAuthStore((state) => state.user);

  const handleReviewSubmit = () => {
    if (!user?.id || !movieId) {
      return;
    }

    const review: ReviewInsert = {
      user_id: user.id,
      movie_id: movieId,
      review: newReview,
      rating: rating,
    };
    createReview(review);
    setNewReview("");
    setRating(0);
  };

  if (status === "pending") return <div>로딩중...</div>;
  if (status === "error") return <div>오류 발생!</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      {movieData && (
        <>
          <div className="relative w-full h-96 mb-8">
            <img
              src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
              alt={movieData.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-8 left-8 text-white bg-black bg-opacity-50 p-6 rounded-lg md:max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">{movieData.title}</h1>
              <p>출시일: {movieData.release_date}</p>
              <p>평점: {movieData.vote_average}</p>
              <p>투표수: {movieData.vote_count}</p>
              <p>
                장르:{" "}
                {movieData.genres?.map((genre: Genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row bg-slate-900 p-6 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/w342/${movieData.poster_path}`}
              alt={movieData.title}
              className="w-[342px] md:w-[342px] h-auto mb-4 md:mb-0 md:mr-4 rounded-lg shadow-lg"
            />
            <div className="flex-1">
              <div className="mb-4 ml-4">
                <ul className="flex items-center">
                  <li
                    className={`cursor-pointer p-4 transition-colors duration-300 ${
                      activeTab === "details"
                        ? "border-b-2 border-red-700 text-red-700"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    영화 상세 정보
                  </li>
                  <li
                    className={`cursor-pointer p-4 transition-colors duration-300 ${
                      activeTab === "reviews"
                        ? "border-b-2 border-red-700 text-red-700"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    리뷰 목록
                  </li>
                  <li
                    className={`cursor-pointer p-4 transition-colors duration-300 ${
                      activeTab === "writeReview"
                        ? "border-b-2 border-red-700 text-red-700"
                        : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("writeReview")}
                  >
                    리뷰 작성
                  </li>
                  <li className="ml-auto">
                    <button className="px-4 py-2 bg-red-700 rounded text-white transition duration-300 hover:bg-red-600 hover:text-gray-200">
                      찜하기
                    </button>
                  </li>
                </ul>
                <div className="transition-opacity duration-300 ease-in-out">
                  {activeTab === "details" && (
                    <div className="mt-4">
                      <h2 className="text-2xl font-bold">영화 상세 정보</h2>
                      <p className="mt-2">{movieData.overview}</p>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div className="mt-4 max-h-[400px] overflow-y-auto">
                      <h2 className="text-2xl font-bold">리뷰 목록</h2>
                      {reviewsLoading ? (
                        <p>리뷰 로딩 중...</p>
                      ) : (
                        <ul>
                          {reviews?.map((review) => (
                            <li key={review.id} className="mt-2">
                              <div className="p-2 bg-gray-800 rounded flex justify-between items-center">
                                <div>
                                  <p className="font-bold">
                                    {review.user.nickname}
                                  </p>
                                  <p>{review.review}</p>
                                  {review.rating && (
                                    <p className="text-yellow-500">
                                      {Array.from(
                                        { length: review.rating },
                                        (_, i) => (
                                          <span key={i}>&#9733;</span>
                                        )
                                      )}
                                    </p>
                                  )}
                                </div>
                                <p className="text-sm text-gray-400">
                                  {review.created_at &&
                                    new Date(
                                      review.created_at
                                    ).toLocaleString()}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {activeTab === "writeReview" && (
                    <div className="mt-4">
                      <h2 className="text-2xl font-bold">댓글(리뷰) 작성</h2>
                      <StarRating rating={rating} setRating={setRating} />
                      <textarea
                        className="w-full p-2 mt-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-700"
                        rows={5}
                        placeholder="댓글을 작성하세요..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                      ></textarea>
                      <button
                        className="mt-2 px-4 py-2 bg-red-700 rounded text-white transition duration-300 hover:bg-red-600 hover:text-gray-200"
                        onClick={handleReviewSubmit}
                        disabled={reviewLoading}
                      >
                        {reviewLoading ? "작성 중..." : "작성"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetailPage;
