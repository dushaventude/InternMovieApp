import React, { useEffect, useState } from "react";
import CarouselItem from "../../molecules/CarouselItem";
import CarouselNextMoviesList from "../../molecules/CarouselNextMoviesList";
import "./styles.scss";
interface Movie {
  Id: number;
  Title: string;
  Photo: string;
  ReleaseDate: string;
}
interface CarouselProps {
  movies: Movie[];
}

const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const nextMovies = [];
  for (let i = 1; i <= 4; i++) {
    nextMovies.push(movies[(currentIndex + i) % movies.length]);
  }
  return (
    <div
      className="carousel-container"
      style={{ backgroundImage: `url(${movies[currentIndex].Photo})` }}
    >
      <div className="carousel-content">
        <CarouselItem
          title={movies[currentIndex].Title}
          releaseDate={movies[currentIndex].ReleaseDate}
          photo={movies[currentIndex].Photo}
        />
        <CarouselNextMoviesList movies={nextMovies} />
      </div>
    </div>
  );
};

export default Carousel;
