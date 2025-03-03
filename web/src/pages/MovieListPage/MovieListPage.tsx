import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "../../components/molecules/smallCard";
import SmallCardSkeleton from "../../components/molecules/Skeleton/SmallCardSkeleton"; 
import styles from "./movieListPage.module.scss";
import { fetchAllMovies } from "../../store/features/movies/movieSlice";
import { RootState, AppDispatch } from "../../store/index";
import { useLocation } from "react-router-dom";
import "./styles.scss";
import { getFullYear } from "../../utils/helpers";
import Pagination from "../../components/organisms/Pagination";

interface IMovie {
  Id: number;
  Title: string;
  Photo: string;
  ReleaseDate: string;
}

interface IResponse {
  Response: IMovie[];
}

const MovieListPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const currentYear = new Date().getFullYear();
  const [currentPage, setCurrentPage] = useState(1);

  const [releaseYearFrom, setReleaseYearFrom] = useState("1900");
  const [releaseYearTo, setReleaseYearTo] = useState(currentYear.toString());
  const [isFeatured, setIsFeatured] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const { fetchMovies, fetchStatus, error } = useSelector(
    (state: RootState) => state.movies
  );
  console.log(fetchMovies);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryFromURL = searchParams.get("query");

  useEffect(() => {
    setShowFilters(false);
    dispatch(
      fetchAllMovies({
        Query: queryFromURL || "",
        ReleaseDateFrom: `${releaseYearFrom}-01-01`,
        ReleaseDateTo: `${releaseYearTo}-12-31`,
        IsFeatured: isFeatured,
        PageSize: 10,
        PageNumber: currentPage,
      })
    );
  }, [
    dispatch,
    queryFromURL,
    releaseYearFrom,
    releaseYearTo,
    isFeatured,
    currentPage,
  ]);

  if (fetchStatus === "loading") {
    return (
      <div className="all-movies-container">
        <div className="movies-header">
          <h1 className="movies-header-title">
            {queryFromURL
              ? `Search results for "${queryFromURL}"`
              : "All Movies"}
          </h1>
          <div
            className="movies-header-filter"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="filter-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            <p>Filter Movies</p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.grid}>
            {Array.from({ length: 10 }).map((_, index) => (
              <SmallCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (fetchStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  const movies: IMovie[] =
    (fetchMovies as unknown as IResponse)?.Response || [];

  if (movies.length === 0) {
    return <div>No movies found.</div>;
  }

  const generateYearOptions = () => {
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <div className="all-movies-container">
      <div className="movies-header">
        <h1 className="movies-header-title">
          {queryFromURL
            ? `Search results for "${queryFromURL}" (${movies.length} result found)`
            : "All Movies"}
        </h1>
        <div
          className="movies-header-filter"
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="filter-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          <p>Filter Movies</p>

          {showFilters && (
            <div className="filter-box" onClick={(e) => e.stopPropagation()}>
              <div className="release-dates">
                <div className="release-year-select">
                  <label>From</label>
                  <select
                    value={releaseYearFrom}
                    onChange={(e) => setReleaseYearFrom(e.target.value)}
                  >
                    {generateYearOptions().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="release-year-select">
                  <label>To</label>
                  <select
                    value={releaseYearTo}
                    onChange={(e) => setReleaseYearTo(e.target.value)}
                  >
                    {generateYearOptions().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="filter-featured">
                <input
                  type="checkbox"
                  className=""
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <label>Featured Movies</label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {movies.map((movie: IMovie) => (
            <SmallCard
              key={movie.Id}
              id={movie.Id}
              title={movie.Title}
              image={movie.Photo}
              type="movies"
              releaseDate={
                movie.ReleaseDate ? getFullYear(movie.ReleaseDate) : "Unknown"
              }
            />
          ))}
        </div>
      </div>
      {fetchMovies.Response && (
        <Pagination
          movies={fetchMovies.Response}
          totalCount={fetchMovies.TotalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MovieListPage;
