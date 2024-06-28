import { useState } from "react";
import { StarButton } from "./StarButton";

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (rating: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <StarButton
            key={ratingValue}
            ratingValue={ratingValue}
            hover={hover}
            rating={rating}
            setRating={setRating}
            setHover={setHover}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
