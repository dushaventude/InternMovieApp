import React from "react";
import "./styles.scss";
import Button from "../../atoms/button/Button";

interface ReviewHeaderProps {
  thumbnail: string;
  title: string;
  onClick: () => void;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  thumbnail,
  title,
  onClick,
}) => {
  return (
    <div className="reviewHeader">
      <div className="reviewHeaderLeft">
        <img src={thumbnail} className="reviewHeaderImage" />
        <div className="reviewHeaderText">
          <p className="title">{title}</p>
          <p>User Reviews</p>
        </div>
      </div>
      {/* <p className="addRating">Add My Rating</p> */}
      <Button variant="primary" size="small" onClick={onClick}>
        Add My Rating
      </Button>
    </div>
  );
};

export default ReviewHeader;
