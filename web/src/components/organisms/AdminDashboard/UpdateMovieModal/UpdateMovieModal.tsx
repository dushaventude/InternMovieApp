import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMovie,
  fetchMovieById,
} from "../../../../store/features/movies/movieSlice";
import { AppDispatch, RootState } from "../../../../store";
import "./styles.scss";

const UpdateMovieModal = ({
  movie,
  onClose,
}: {
  movie: any;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState(movie);

  // Get the latest movie data from Redux store after update
  const updatedMovie = useSelector(
    (state: RootState) =>
      state.movies.fetchMovies.find((m) => m.Id === movie.Id) || movie
  );

  useEffect(() => {
    dispatch(fetchMovieById(movie.Id));
  }, [dispatch, movie.Id]);

  // Sync state with updated movie data
  useEffect(() => {
    setFormData(updatedMovie);
  }, [updatedMovie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhotoUrlChange = (index: number, value: string) => {
    const updatedUrls = [...formData.PhotoUrlList];
    updatedUrls[index] = value;
    setFormData({ ...formData, PhotoUrlList: updatedUrls });
  };

  const addPhotoUrl = () => {
    setFormData({ ...formData, PhotoUrlList: [...formData.PhotoUrlList, ""] });
  };

  const removePhotoUrl = (index: number) => {
    const updatedUrls = formData.PhotoUrlList.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, PhotoUrlList: updatedUrls });
  };

  const handleSubmit = async () => {
    await dispatch(updateMovie({ id: movie.Id, movieData: formData }));
    await dispatch(fetchMovieById(movie.Id)); // Fetch updated movie data
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Movie</h3>

        <label>Title</label>
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
        />

        <label>Release Date</label>
        <input
          type="date"
          name="ReleaseDate"
          value={formData.ReleaseDate}
          onChange={handleChange}
        />

        <label>
          <input
            type="checkbox"
            name="IsFeatured"
            checked={formData.IsFeatured}
            onChange={handleChange}
          />
          Featured Movie
        </label>

        <h4>Main Photo</h4>
        <input
          type="text"
          name="Photo"
          value={formData.Photo}
          onChange={handleChange}
        />

        <h4>Additional Photo URLs</h4>
        {formData.PhotoUrlList.length > 0 ? (
          formData.PhotoUrlList.map((url: string, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={url}
                onChange={(e) => handlePhotoUrlChange(index, e.target.value)}
              />
              <button onClick={() => removePhotoUrl(index)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No additional photos available</p>
        )}
        <button onClick={addPhotoUrl}>Add Photo URL</button>

        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateMovieModal;
