import { ReviewForm, ReviewList } from "@/components/movie/review";
import {
  useCreateBookmark,
  useDeleteBookmark,
  useGetBookmarks,
} from "@/components/shared/hooks/useBookmark";
import { useGetMovieDetails } from "@/components/shared/hooks/useMovies";
import { useAuthStore } from "@/store/authStore";
import { Genre } from "@/types/MovieType";
import { ReviewUpdate } from "@/types/supabaseTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movieData, status } = useGetMovieDetails(Number(movieId));
  const user = useAuthStore((state) => state.user);
  const { mutate: createBookmark } = useCreateBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();
  const { data: bookmarks } = useGetBookmarks(user?.id || "");
  const [activeTab, setActiveTab] = useState("details");
  const [editingReview, setEditingReview] = useState<ReviewUpdate | null>(null);
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    if (bookmarks && movieId) {
      const found = bookmarks.some(
        (bookmark) => bookmark.movie_id === movieId.toString()
      );
      setIsBookmark(found);
    }
  }, [bookmarks, movieId]);

  const handleSave = () => {
    setActiveTab("reviews");
    setEditingReview(null);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  const handleEditReview = (review: ReviewUpdate) => {
    setEditingReview(review);
    setActiveTab("writeReview");
  };

  const handleToggleBookmark = () => {
    if (user?.id && movieData) {
      if (isBookmark) {
        const bookmark = bookmarks?.find(
          (bookmark) => bookmark.movie_id === movieId
        );
        if (bookmark) deleteBookmark(bookmark.id);
      } else {
        createBookmark({
          user_id: user.id,
          movie_id: movieData.id.toString(),
          movie_title: movieData.title,
          movie_genre: movieData.genres?.map((g) => g.name).join(", "),
        });
      }
      setIsBookmark(!isBookmark);
    }
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
              <p>{`${movieData.original_title}  ·  ${
                movieData.release_date?.split("-")[0]
              }`}</p>
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
                    <button
                      className="px-4 py-2 bg-red-700 rounded text-white transition duration-300 hover:bg-red-600 hover:text-gray-200"
                      onClick={handleToggleBookmark}
                    >
                      {isBookmark ? "북마크 해제" : "북마크"}
                    </button>
                  </li>
                </ul>
                <div className="transition-opacity duration-300 ease-in-out">
                  {activeTab === "details" && (
                    <div className="mt-4">
                      <p className="mt-2">{movieData.overview}</p>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <ReviewList
                      movieId={movieId || ""}
                      onEdit={handleEditReview}
                    />
                  )}
                  {activeTab === "writeReview" && (
                    <ReviewForm
                      user={user}
                      movieId={movieId || ""}
                      editingReview={editingReview}
                      onSave={handleSave}
                      onCancelEdit={handleCancelEdit}
                    />
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
