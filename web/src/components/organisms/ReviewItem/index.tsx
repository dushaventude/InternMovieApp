import React, { use, useState } from "react";
import {
  formatDate,
  getBackgroundColor,
  getTimeAgo,
} from "../../../utils/helpers";
import "./styles.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import {
  deleteReview,
  removeReview,
} from "../../../store/features/reviews/reviewSlice";
import Spinner from "../../atoms/Spinner";

interface Review {
  Id: number;
  UserId: string;
  Rate: number;
  FirstName: string;
  LastName: string;
  CreatedDatetime: string;
  Comment: string;
}

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const [reviewContent, setReviewContent] = useState(review.Comment);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { deleteStatus } = useAppSelector((state: RootState) => state.reviews);

  function handleDelete() {
    dispatch(deleteReview(review.Id))
      .unwrap()
      .then(() => {
        dispatch(removeReview(review.Id));
      })
      .catch((error) => {
        console.error("Failed to delete review:", error);
        alert("Failed to delete review. Please try again.");
      });
  }

  function handleEdit() {
    setEdit(() => true);
  }

  return (
    <div className="reviewItem">
      {deleteStatus === "loading" && <Spinner />}
      <div className="reviewItemHeader">
        <div className="ratingCircleAvatar">
          <p
            className="ratingCircle"
            style={{ backgroundColor: getBackgroundColor(review.Rate) }}
          >
            {review.Rate}
          </p>
          <p>
            {review.FirstName} {review.LastName}
          </p>
        </div>
        {/* <p>{formatDate(review.CreatedDatetime)}</p> */}
        <p>{getTimeAgo(review.CreatedDatetime)}</p>
      </div>
      {edit ? (
        <textarea
          placeholder="Write your review here..."
          // disabled={createStatus === "loading"}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
      ) : (
        <p className="comment">{review.Comment}</p>
      )}
      {user?.id === review.UserId && (
        <div className="comment-edit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="review-icon edit"
            onClick={handleEdit}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="review-icon delete"
            onClick={handleDelete}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
