import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "../../components/molecules/smallCard";
import styles from "./movieListPage.module.scss";
import { fetchAllMovies } from "../../store/features/movies/movieSlice";
import { RootState, AppDispatch } from "../../store/index";

interface IMovie {
  Id: number;
  Title: string;
  Photo: string;
  ReleasedDate: string;
}

interface IResponse {
  Response: IMovie[];
}

const MovieListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { fetchMovies, fetchStatus, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(
      fetchAllMovies({
        Query: "",
        ReleaseDateFrom: "1900-02-27",
        ReleaseDateTo: "2025-02-27",
        IsFeatured: true,
        PageSize: 10,
        PageNumber: 1,
      })
    );
  }, [dispatch]);

  console.log("Output", fetchMovies);

  if (fetchStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (fetchStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  // Ensure fetchMovies is of type IResponse and extract the Response array
  const movies: IMovie[] = ((fetchMovies as unknown) as IResponse)?.Response || [];

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  console.log("Movies", movies);

  return (
    <div className={styles.container}>
      <h1>All Movies</h1>
      <div className={styles.grid}>
        {movies.map((movie: IMovie) => (
          <SmallCard
            key={movie.Id}
            title={movie.Title}
            image={movie.Photo}
            releaseDate={
              movie.ReleasedDate
                ? new Date(movie.ReleasedDate).toISOString().split("T")[0]
                : "Unknown"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;
