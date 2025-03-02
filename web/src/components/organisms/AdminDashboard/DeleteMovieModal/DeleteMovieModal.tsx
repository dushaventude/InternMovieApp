import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
  deleteMovie,
  fetchSearchMovies,
} from "../../../../store/features/movies/movieSlice";
import "./styles.scss";

const DeleteMovieModal = ({
  movieId,
  onClose,
}: {
  movieId: number;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("Movie ID received in modal:", movieId);
  }, [movieId]);

  const handleDelete = async () => {
    if (!movieId) {
      console.error("Error: movieId is undefined or null!");
      return;
    }
    
    await dispatch(deleteMovie(movieId));
    // Manually refresh movies after deletion
    await dispatch(
      fetchSearchMovies({
        Query: "",
        ReleaseDateFrom: "1900-01-01",
        ReleaseDateTo: "2025-12-12",
        PageSize: 10,
        PageNumber: 1,
      })
    );
    alert("Movie Deleted successfully!");
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete this movie?</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
