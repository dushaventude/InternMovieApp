import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HeroSection from "../components/organisms/HeroSection";
import Review from "../components/templates/Review";
import { fetchMovieById } from "../store/features/movies/movieSlice";
import { RootState, useAppDispatch, useAppSelector } from "../store/index";

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { movie } = useAppSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) dispatch(fetchMovieById(id));
  }, [id, dispatch]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeroSection
        title={movie.Title}
        description={movie.Description}
        photo={movie.Photo}
        imageUrl={movie.PhotoUrlList}
        averageRating={movie.AverageRating}
        releaseDate={movie.ReleaseDate}
      />
      <Review
        photo={movie.Photo}
        title={movie.Title}
        averageRating={movie.AverageRating}
      />
    </div>
  );
};

export default MoviePage;
