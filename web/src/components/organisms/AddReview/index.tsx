import React, { useState } from "react";
// import StarRating from "../../organisms/StarRating"; // Import your star rating component
import "./styles.scss"; // Import styles
import Rating from "../../molecules/Rating";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { createReview } from "../../../store/features/reviews/reviewSlice";

interface AddReviewProps {
  movieId: number;
}

const AddReview: React.FC<AddReviewProps> = ({ movieId }) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewContent, setReviewContent] = useState<string>("");

  const dispatch = useAppDispatch();
  const { createStatus } = useAppSelector((state: RootState) => state.reviews);

  const handleSubmit = () => {
    if (rating == 0 || !reviewContent.trim()) {
      alert("Please provide a rating and a review.");
      return;
    }
    dispatch(
      createReview({ MovieId: movieId, Comment: reviewContent, Rate: rating })
    );
    handleReset();
  };

  function handleReset() {
    setRating(0);
    setReviewContent("");
  }

  return (
    <div className="add-review-container">
      {createStatus === "loading" && <span className="loader"></span>}
      <h3>Share your review</h3>
      <div className="rating-section">
        <p>Your Rating:</p>
        <Rating
          stars={10}
          size="md"
          selectedRating={rating}
          onRatingSelect={setRating}
        />
      </div>
      <textarea
        placeholder="Write your review here..."
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />
      <div className="buttons">
        <button className="cancel-btn" onClick={handleReset}>
          Reset
        </button>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
