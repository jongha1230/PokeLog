export const StarButton = ({
  ratingValue,
  hover,
  rating,
  setRating,
  setHover,
}: {
  ratingValue: number;
  hover: number;
  rating: number;
  setRating: (rating: number) => void;
  setHover: (hover: number) => void;
}) => {
  return (
    <button
      type="button"
      className={`text-2xl ${
        ratingValue <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
      }`}
      onClick={() => setRating(ratingValue)}
      onMouseEnter={() => setHover(ratingValue)}
      onMouseLeave={() => setHover(0)}
      aria-label={`Rate ${ratingValue} star`}
      aria-pressed={ratingValue <= rating ? "true" : "false"}
    >
      &#9733;
    </button>
  );
};
