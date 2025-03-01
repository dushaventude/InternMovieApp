import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMovie,
  fetchMovieById,
} from "../../../../store/features/movies/movieSlice";
import { fetchAllActors } from "../../../../store/features/actors/actorSlice";
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
    alert("Movie Updated successfully!");
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
        {(!formData.PhotoUrlList.length || formData.PhotoUrlList[0] === "") && (
          <button onClick={addPhotoUrl}>Add Photo URL</button>
        )}

        <div className="actor-dropdown">
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
        <h4>Existing Actors</h4>
        <div className="selected-actors">
          {actors
            .filter((actor) => selectedActors.includes(actor.Id))
            .map((actor) => (
              <div key={actor.Id} className="selected-actor">
                <span>{actor.Name}</span>
                <button onClick={() => handleRemoveActor(actor.Id)}>
                  Remove
                </button>
              </div>
            ))}
          {selectedActors.length === 0 && (
            <p>No actors selected for this movie.</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <button className="save-btn" onClick={handleSubmit}>
          Save
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateMovieModal;
