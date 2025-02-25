import React from "react";
import { formatDate, getBackgroundColor } from "../../../utils/helpers";
import "./styles.scss";

interface Review {
  Id: string;
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
  return (
    <div className="reviewItem">
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
        <p>{formatDate(review.CreatedDatetime)}</p>
      </div>
      <p className="comment">{review.Comment}</p>
    </div>
  );
};

export default ReviewItem;
