import { useState } from "react";
import Star from "../../atoms/Star";
import Typography from "../../atoms/Typography";
import "./styles.scss";

interface RatingProps {
  stars: number;
  selectedRating: number;
  onRatingSelect: (rating: number) => void;
  size: "sm" | "md" | "lg";
}

const Rating: React.FC<RatingProps> = ({
  stars,
  size,
  selectedRating,
  onRatingSelect,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);
  const handleClick = (index: number) => onRatingSelect(index + 1);

  return (
    <div className="rating_container">
      <div className="rating">
        <div>
          {Array.from({ length: stars }, (_, index) => (
            <Star
              key={index}
              size={size}
              color={
                selectedRating !== 0
                  ? index < selectedRating
                    ? "secondary"
                    : "primary"
                  : hoveredIndex !== null
                  ? index <= hoveredIndex
                    ? "secondary"
                    : "primary"
                  : "primary"
              }
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <Typography>
          {selectedRating || 0} / {stars}
        </Typography>
      </div>
      {/* <div className="clear" onClick={() => onRatingSelect(0)}>
        Clear Rating
      </div> */}
    </div>
  );
};

export default Rating;
