import React from "react";
import "./styles.scss";

interface ReviewHeaderProps {
  thumbnail: string;
  title: string;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ thumbnail, title }) => {
  return (
    <div className="reviewHeader">
      <div className="reviewHeaderLeft">
        <img src={thumbnail} className="reviewHeaderImage" />
        <div className="reviewHeaderText">
          <p className="title">{title}</p>
          <p>User Reviews</p>
        </div>
      </div>
      <p className="addRating">Add My Rating</p>
    </div>
  );
};

export default ReviewHeader;
