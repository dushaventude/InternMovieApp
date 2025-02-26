import * as React from "react";
import { useEffect } from "react";
import HeroSection from "../components/organisms/HeroSection";
import { useParams } from "react-router-dom";
import Review from "../components/templates/Review";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { fetchMovieById } from "../store/features/movies/movieSlice";

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { movie } = useSelector((state: RootState) => state.movies);

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
      <Review photo={movie.Photo} title={movie.Title} />
    </div>
  );
};

export default MoviePage;
