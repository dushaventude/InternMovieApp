import React from "react";
import "./styles.scss";

interface SmallCarouselMovieCardProps {
  title: string;
  photo: string;
}

const SmallCarouselMovieCard: React.FC<SmallCarouselMovieCardProps> = ({
  title,
  photo,
}) => {
  return (
    <div className="up-next-item">
      <img src={photo} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default SmallCarouselMovieCard;
