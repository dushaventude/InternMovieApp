import React, { useEffect, useState } from "react";
import "./styles.scss";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMovies } from "../../../store/features/movies/movieSlice";
import { getFullYear } from "../../../utils/helpers";

const Movies: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const { searchMovies, searchStatus } = useSelector(
    (state: RootState) => state.movies
  );
  const pageSize = 10;
  const totalPages = Math.ceil(
    searchMovies?.TotalCount / searchMovies?.PageSize
  );
  useEffect(() => {
    dispatch(
      fetchSearchMovies({
        Query: "",
        ReleaseDateFrom: "1900-01-01",
        ReleaseDateTo: "2025-12-12",
        PageSize: pageSize,
        PageNumber: currentPage,
      })
    );
  }, [dispatch, currentPage]);
  console.log(searchMovies);

  if (searchStatus == "loading") return <div>Loading...</div>;
  return (
    <div className="movies-container">
      <div className="current-navigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="home-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <p>/ Manage Movies</p>
      </div>
      <div className="create-pagination-wrapper">
        <div className="add-new-movie">
          <p>Add New Movie</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=""
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        {searchMovies.Response && (
          <div className="pagination">
            <p>Jump to</p>
            <input type="text" className="jump-to-input" />
            {[...Array(totalPages)].map((_, index) => (
              <p
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${currentPage == index + 1 ? "active-page" : ""}`}
              >
                {index + 1}
              </p>
            ))}
          </div>
        )}
      </div>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchMovies.Response?.length > 0 ? (
            searchMovies.Response?.map((movie, index) => (
              <tr key={movie.Id}>
                <td>{index + 1}</td>
                <td>{movie.Id}</td>
                <td>
                  <img src={movie.Photo} />
                </td>
                <td>{movie.Title}</td>
                <td>{movie.Description}</td>
                <td>{getFullYear(movie.ReleaseDate)}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-data">
                No movies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
