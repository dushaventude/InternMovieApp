import React from "react";
import MovieImage from "../../atoms/MovieImage";
import MovieInfo from "../../atoms/MovieInfo";
import "./styles.scss";

interface CarouselItemProps {
  title: string;
  releaseDate: string;
  rating?: number;
  photo: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  title,
  releaseDate,
  // rating,
  photo,
}) => {
  return (
    <div className="current-movie">
      <MovieImage src={photo} alt={title} />
      <MovieInfo date={releaseDate} title={title} />
    </div>
  );
};

export default CarouselItem;
