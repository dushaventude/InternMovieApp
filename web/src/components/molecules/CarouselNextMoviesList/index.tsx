import React from "react";
import SmallCarouselMovieCard from "../../atoms/SmallCarouselMovieCard";
import "./styles.scss";
interface Movie {
  Id: number;
  Title: string;
  Photo: string;
}

interface CarouselNextMoviesListProps {
  movies: Movie[];
}

const CarouselNextMoviesList: React.FC<CarouselNextMoviesListProps> = ({
  movies,
}) => {
  return (
    <div className="up-next">
      <h3>Up Next</h3>
      {movies.map((movie) => (
        <SmallCarouselMovieCard
          title={movie.Title}
          photo={movie.Photo}
          key={movie.Id}
        />
      ))}
    </div>
  );
};

export default CarouselNextMoviesList;
