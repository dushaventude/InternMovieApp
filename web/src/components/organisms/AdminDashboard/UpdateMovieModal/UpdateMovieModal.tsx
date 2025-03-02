import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMovie } from "../../../../store/features/movies/movieSlice";
import "./styles.scss";
import { AppDispatch } from "../../../../store";

const UpdateMovieModal = ({
  movie,
  onClose,
}: {
  movie: any;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState(movie);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // console.log("Updating movie:", movie);
    dispatch(updateMovie({ id: movie.Id, movieData: formData }));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Movie</h3>
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
        />
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Photo"
          value={formData.Photo}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateMovieModal;
