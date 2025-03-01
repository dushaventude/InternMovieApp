import React, { useEffect } from "react";
import "./styles.scss";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { fetchMoviesFeatured } from "../../../store/features/movies/movieSlice";
import { getFullYear } from "../../../utils/helpers";
import { Link } from "react-router-dom";

const FeaturedMovies: React.FC = () => {
  const dispatch = useAppDispatch();
  const { featuredMovies, featuredMoviesStatus } = useAppSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(
      fetchMoviesFeatured({ IsFeatured: true, PageSize: 10, PageNumber: 1 })
    );
  }, [dispatch]);
  return (
    <div className="featured-movies-container">
      <div className="featured-movies-header">
        <p>Featured Movies</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
      <div className="featured-movies-wrapper">
        {featuredMovies.Response != null &&
          featuredMovies.Response.map((movie) => (
            <Link to={`/movies/${movie.Id}`} className="link">
              <div className="featured-movie-card">
                <img src={movie.Photo} className="featured-movie-image" />
                <div className="featured-movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{getFullYear(movie.ReleaseDate)}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FeaturedMovies;
