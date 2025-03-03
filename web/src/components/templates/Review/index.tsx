import React, { useEffect, useState } from "react";
import Dropdown from "../../organisms/DropDown";
import RatingBar from "../../organisms/OverallReview";
import UserScore from "../../organisms/OverallScoreReview";
import ReviewHeader from "../../organisms/ReviewHeader";
import ReviewItem from "../../organisms/ReviewItem";
import "./styles.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import AddReview from "../../organisms/AddReview";
import { getAllReviews } from "../../../store/features/reviews/reviewSlice";
import { getReviewSentimentCounts } from "../../../utils/helpers";
interface Review {
  Id: string;
  UserId: string;
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
  averageRating: number | null;
}

const Review: React.FC<ReviewProps> = ({ photo, title, averageRating }) => {
  const [selectedReviewType, setSelectedReviewType] =
    useState<string>("All Reviews");
  const [selectedSortOrder, setSelectedSortOrder] =
    useState<string>("Recently Added");

  const [showAddHere, setShowAddHere] = useState(false);

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state: RootState) => state.user);
  const { reviewList } = useAppSelector((state: RootState) => state.reviews);

  const navigate = useNavigate();
  const location = useLocation();

  const { positive, mixed, negative } = getReviewSentimentCounts(reviewList);

  const handleAddRating = () => {
    if (!token) {
      navigate("/login", { state: { from: location.pathname } });
    }
    setShowAddHere(true);
  };

  ///////////////////////////////////////////////////////////////
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getAllReviews(Number(id)));
  }, [dispatch, id]);

  const handleReviewFilter = (option: string) => {
    setSelectedReviewType(option);
  };

  const handleSortFilter = (option: string) => {
    setSelectedSortOrder(option);
  };

  return (
    <div className="review-container">
      <ReviewHeader thumbnail={photo} title={title} onClick={handleAddRating} />

      {reviewList.length !== 0 && (
        <>
          <div className="review-grid">
            <UserScore avgRating={5} />
            <RatingBar positive={positive} mixed={mixed} negative={negative} />
          </div>

          <div className="review-header-wrapper">
            <p>Showing {reviewList.length} User Reviews</p>
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
        </>
      )}
      {showAddHere && <AddReview movieId={id} />}
      {reviewList.length > 0 ? (
        <div className="review-list">
          {[...reviewList].reverse().map((review) => (
            <ReviewItem review={review} key={review.Id} />
          ))}
        </div>
      ) : (
        <p className="no-reviews">No reviews found. Be the first to review</p>
      )}
    </div>
  );
};

export default Review;
