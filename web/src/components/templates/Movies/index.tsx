"use client";
import type React from "react";
import { useEffect, useState } from "react";
import "./styles.scss";
//import { useAppDispatch, RootState,useAppSelector } from "../../../store";
//import { useDispatch, useSelector } from "react-redux";
<!-- import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux"; -->
import { fetchSearchMovies } from "../../../store/features/movies/movieSlice";
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "../../../store";
import { getFullYear } from "../../../utils/helpers";
import Button from "../../atoms/button/Button";
import Dialog from "../../atoms/DialogBox/Dialog";
import MovieForm from "../../molecules/MovieForm/MovieForm";
import UpdateMovieModal from "../../organisms/AdminDashboard/UpdateMovieModal/UpdateMovieModal";
import DeleteMovieModal from "../../organisms/DeleteMovieModal/DeleteMovieModal";
import { Import } from "lucide-react";

interface Movie {
  Id?: number;
  Title: string;
  Description: string;
  ReleaseDate: string;
  Photo: string;
}

const Movies: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const { searchMovies, searchStatus } = useAppSelector(
         (state: RootState) => state.movies
  );

  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [isEditMovieOpen, setIsEditMovieOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [jumpToPage, setJumpToPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
//   const [selectedMovie, setSelectedMovie] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

   

  //   const pageSize = 10;

  const openUpdateModal = (movieId) => {
    setSelectedMovie(movieId);
    setUpdateModalOpen(true);
  };

  const openDeleteModal = (movie) => {
    console.log("Opening delete modal for movie:", movie); // Log full movie object
    if (!movie || typeof movie !== "object" || !movie.Id) {
      console.error("Error: movie object is invalid!", movie);
      return;
    }

    setSelectedMovie(movie);
    setDeleteModalOpen(true);
  };


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

<!--   }, [dispatch, currentPage]); -->

  }, [dispatch, currentPage, pageSize]);
  console.log(searchMovies);


  const handleAddMovie = () => {
    setIsAddMovieOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsEditMovieOpen(true);
  };

  const handleSubmitMovie = (movie: Movie) => {
    // Here you would dispatch an action to add/update the movie
    console.log("Submitting movie:", movie);

    // Close the dialog
    if (selectedMovie) {
      setIsEditMovieOpen(false);
    } else {
      setIsAddMovieOpen(false);
    }

    // Reset selected movie
    setSelectedMovie(null);
  };

  const handleJumpToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = Number.parseInt(jumpToPage);
      if (!isNaN(page) && page > 0 && page <= totalPages) {
        setCurrentPage(page);
        setJumpToPage("");
      }
    }
  };

  if (searchStatus === "loading") return <div>Loading...</div>;

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
        <Button className="add-new-movie" onClick={handleAddMovie}>
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
        </Button>

        {searchMovies.Response && (
          <div className="pagination">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
            <p>Jump to</p>
            <input
              type="text"
              className="jump-to-input"
              value={jumpToPage}
              onChange={(e) => setJumpToPage(e.target.value)}
              onKeyDown={handleJumpToPage}
              placeholder="Enter page number"
            />
            {[...Array(totalPages)].map((_, index) => (
              <p
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${currentPage === index + 1 ? "active-page" : ""}`}
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
                <td>{(currentPage - 1) * pageSize + (index + 1)}</td>
                <td>{movie.Id}</td>
                <td>
                  <img
                    src={movie.Photo || "/placeholder.svg"}
                    alt={movie.Title}
                  />
                </td>
                <td>{movie.Title}</td>
                <td>{movie.Description}</td>
                <td>{getFullYear(movie.ReleaseDate)}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openUpdateModal(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => openDeleteModal(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                No movies found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Movie Dialog */}
      <Dialog
        isOpen={isAddMovieOpen}
        onClose={() => setIsAddMovieOpen(false)}
        title="Add New Movie"
        size="medium"
      >
        <MovieForm
          onSubmit={handleSubmitMovie}
          onCancel={() => setIsAddMovieOpen(false)}
        />
      </Dialog>

      {/* Edit Movie Dialog */}
      <Dialog
        isOpen={isEditMovieOpen}
        onClose={() => {
          setIsEditMovieOpen(false);
          setSelectedMovie(null);
        }}
        title="Edit Movie"
        size="medium"
      >
        {selectedMovie && (
          <MovieForm
            movie={selectedMovie}
            onSubmit={handleSubmitMovie}
            onCancel={() => {
              setIsEditMovieOpen(false);
              setSelectedMovie(null);
            }}
          />
        )}
      </Dialog>

<!--       {isUpdateModalOpen && (
        <UpdateMovieModal
          movie={selectedMovie}
          onClose={() => setUpdateModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          movieId={selectedMovie?.Id}
          onClose={() => setDeleteModalOpen(false)}
        />
      )} -->

    </div>
  );
};

export default Movies;
