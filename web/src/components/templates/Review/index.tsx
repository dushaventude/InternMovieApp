import React, { useEffect, useState } from "react";
import Dropdown from "../../organisms/DropDown";
import RatingBar from "../../organisms/OverallReview";
import UserScore from "../../organisms/OverallScoreReview";
import ReviewHeader from "../../organisms/ReviewHeader";
import ReviewItem from "../../organisms/ReviewItem";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { PhoneOutgoing } from "lucide-react";
interface Review {
  Id: string;
  Username: string;
  Rate: number;
  CreatedDatetime: string;
  Comment: string;
  FirstName: string;
  LastName: string;
}

interface ReviewProps {
  photo: string;
  title: string;
}

const Review: React.FC<ReviewProps> = ({ photo, title }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReviewType, setSelectedReviewType] =
    useState<string>("All Reviews");
  const [selectedSortOrder, setSelectedSortOrder] =
    useState<string>("Recently Added");

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchMovie(id: string) {
      try {
        const response = await fetch(`http://localhost:5140/api/Review/${id}`);
        const data = await response.json();
        console.log(data);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    }
    if (id) fetchMovie(id);
  }, [id]);

  const handleReviewFilter = (option: string) => {
    setSelectedReviewType(option);
  };

  const handleSortFilter = (option: string) => {
    setSelectedSortOrder(option);
  };

  return (
    <div className="review-container">
      <ReviewHeader thumbnail={photo} title={title} />

      <div className="review-grid">
        <UserScore avgRating={5.7} />
        <RatingBar positive={455} mixed={46} negative={40} />
      </div>

      <div className="review-header-wrapper">
        <p>Showing {reviews.length} User Reviews</p>
        <div className="dropdown-wrapper">
          <Dropdown
            label={selectedReviewType}
            options={[
              "All Reviews",
              "Positive Reviews",
              "Mixed Reviews",
              "Negative Reviews",
            ]}
            onSelect={handleReviewFilter}
          />
          <Dropdown
            label={selectedSortOrder}
            options={["Recently Added", "Score"]}
            onSelect={handleSortFilter}
          />
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="review-list">
          {reviews.map((review) => (
            <ReviewItem review={review} key={review.Id} />
          ))}
        </div>
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default Review;
