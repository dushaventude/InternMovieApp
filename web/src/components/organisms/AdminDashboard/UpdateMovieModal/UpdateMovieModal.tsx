import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMovie,
  fetchMovieById,
} from "../../../../store/features/movies/movieSlice";
import { fetchAllActors } from "../../../../store/features/actors/actorSlice";
import { AppDispatch, RootState } from "../../../../store";
import { useUserOptimizer } from "../../../../hooks/useUserOptimizer";
import "./styles.scss";
import Dialog from "../../../../components/atoms/DialogBox/Dialog";
import { useNotification } from "../../../../contexts/NotificationContext";

const UpdateMovieModal = ({
  movie,
  onClose,
}: {
  movie: any;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { refresh } = useUserOptimizer();
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState(movie);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Get the latest movie data from Redux store after update.
  const updatedMovie = useSelector(
    (state: RootState) => state.movies.movie || movie
  );
  // All actors from the backend.
  const actors = useSelector(
    (state: RootState) => state.actors.fetchActors?.Response || []
  );
  // Initialize with ActorIds if available, or map from Actors.
  const [selectedActors, setSelectedActors] = useState<number[]>(
    movie.ActorIds || movie.Actors?.map((actor: any) => actor.Id) || []
  );

  useEffect(() => {
    dispatch(fetchMovieById(movie.Id));
    dispatch(fetchAllActors({ pageNumber: 1, pageSize: 50 })); // Fetch actors
  }, [dispatch, movie.Id]);

  // Sync state with updated movie data
  useEffect(() => {
    setFormData(updatedMovie);
    setSelectedActors(
      updatedMovie.ActorIds ||
        updatedMovie.Actors?.map((actor: any) => actor.Id) ||
        []
    );
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

  // Modified addPhotoUrl: Only add if there is no photo or if the existing field is empty.
  const addPhotoUrl = () => {
    if (
      !formData.PhotoUrlList ||
      formData.PhotoUrlList.length === 0 ||
      formData.PhotoUrlList[0] === ""
    ) {
      setFormData({ ...formData, PhotoUrlList: [""] });
    }
  };

  const removePhotoUrl = (index: number) => {
    const updatedUrls = formData.PhotoUrlList.filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, PhotoUrlList: updatedUrls });
  };

  // Handler to add actor from dropdown.
  const handleAddActor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const actorId = parseInt(e.target.value);
    if (actorId && !selectedActors.includes(actorId)) {
      setSelectedActors((prev) => [...prev, actorId]);
      // Clear any error once an actor is added
      setErrorMessage("");
    }
    // Reset dropdown value.
    e.target.value = "";
  };


  // Handler to remove an actor from the selected list.
  const handleRemoveActor = (actorId: number) => {
    setSelectedActors((prev) => prev.filter((id) => id !== actorId));
  };

  const handleSubmit = async () => {
    // Validate that at least one actor is selected.
    if (selectedActors.length === 0) {
      setErrorMessage("Please select at least one actor.");
      return;
    }
    const updatedData = { ...formData, ActorIds: selectedActors };
    await dispatch(updateMovie({ id: movie.Id, movieData: updatedData }));
    await dispatch(fetchMovieById(movie.Id)); // Fetch updated movie data
    showNotification("Movie updated successfully!", "success");
    await refresh();
    onClose();
  };

  return (
    <Dialog isOpen={true} onClose={onClose} title="Edit Movie" size="medium">
      <div className="movie-form">
        <div className="form-group">
          <label htmlFor="movie-title">Title</label>
          <input
            id="movie-title"
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="movie-description">Description</label>
          <textarea
            id="movie-description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="release-date">Release Date</label>
          <input
            id="release-date"
            type="date"
            name="ReleaseDate"
            value={formData.ReleaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="IsFeatured"
              checked={formData.IsFeatured}
              onChange={handleChange}
            />
            Featured Movie
          </label>
        </div>

        <div className="form-group">
          <h4>Main Photo</h4>
          <input
            type="text"
            name="Photo"
            value={formData.Photo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <h4>Additional Photo URL</h4>
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
            <p>No additional photo available</p>
          )}
          {(!formData.PhotoUrlList.length ||
            formData.PhotoUrlList[0] === "") && (
            <button onClick={addPhotoUrl}>Add Photo URL</button>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="actor-select">Add Actor:</label>
          <select id="actor-select" onChange={handleAddActor}>
            <option value="">Select an actor</option>
            {actors
              .filter((actor) => !selectedActors.includes(actor.Id))
              .map((actor) => (
                <option key={actor.Id} value={actor.Id}>
                  {actor.Name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <h4>Existing Actors</h4>
          <div className="added-actors-list">
            {actors
              .filter((actor) => selectedActors.includes(actor.Id))
              .map((actor) => (
                <div key={actor.Id} className="added-actor">
                  <span>{actor.Name}</span>
                  <button
                    className="remove-actor-btn"
                    onClick={() => handleRemoveActor(actor.Id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            {selectedActors.length === 0 && (
              <p>No actors selected for this movie.</p>
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateMovieModal;
