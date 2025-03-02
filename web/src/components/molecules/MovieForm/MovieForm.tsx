"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./MovieForm.scss";
import ImageUpload from "../ImageUpload/ImageUpload";
import ActorSearch from "../ActorSearch/ActorSearch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import { fetchAllActors } from "../../../store/features/actors/actorSlice";
import { debounce } from "lodash";

interface Actor {
  Id: number;
  Name: string;
  Photo: string;
  DOB: string;
}

interface Movie {
  id?: number;
  title: string;
  description: string;
  releaseDate: string;
  photoUrl: string;
  actors: Actor[];
  isFeatured: boolean;
}

interface MovieFormProps {
  movie?: Movie;
  isFeatured: false;
  onSubmit: (movie: Movie) => void;
  onCancel: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Movie>(
    movie || {
      title: "",
      description: "",
      releaseDate: "",
      photoUrl: "",
      actors: [],
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Actor[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { fetchActors, fetchStatus, error } = useSelector(
    (state: RootState) => state.actors
  );

  // Fetch actors on component mount
  useEffect(() => {
    dispatch(fetchAllActors({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch]);

  // Update search results when actors are fetched
  useEffect(() => {
    if (fetchStatus === "succeeded") {
      const actors =
        (fetchActors as unknown as { Response: Actor[] })?.Response || [];
      setSearchResults(actors);
    }
  }, [fetchActors, fetchStatus]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle image upload
  const handleImageChange = (url: string) => {
    setFormData((prev) => ({ ...prev, photoUrl: url }));
  };

  // Debounced actor search
  const handleActorSearch = useCallback(
    debounce((term: string) => {
      if (term) {
        const filteredActors = searchResults.filter((actor) =>
          actor.Name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredActors);
      } else {
        const actors =
          (fetchActors as unknown as { Response: Actor[] })?.Response || [];
        setSearchResults(actors);
      }
    }, 300),
    [fetchActors, searchResults]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleActorSearch(term);
  };

  // Add an actor to the movie
  const handleAddActor = (actor: Actor) => {
    if (!formData.actors.some((a) => a.Id === actor.Id)) {
      setFormData((prev) => ({
        ...prev,
        actors: [...prev.actors, actor],
      }));
    }
    setSearchTerm("");
  };

  // Remove an actor from the movie
  const handleRemoveActor = (actorId: number) => {
    setFormData((prev) => ({
      ...prev,
      actors: prev.actors.filter((a) => a.Id !== actorId),
    }));
  };

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.releaseDate)
      newErrors.releaseDate = "Release date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   

    if (validate()) {
      // console.log(formData);
      onSubmit(formData);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? "error" : ""}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={errors.description ? "error" : ""}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="releaseDate">Release Date</label>
        <input
          type="date"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          className={errors.releaseDate ? "error" : ""}
        />
        {errors.releaseDate && (
          <span className="error-message">{errors.releaseDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="isFeatured">Is Featured</label>
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isFeatured: e.target.checked,
            }))
          }
        />
      </div>

      <ImageUpload
        value={formData.photoUrl}
        onChange={handleImageChange}
        label="Movie Poster"
      />

      <ActorSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchResults={searchResults}
        onActorSelect={handleAddActor}
      />

      <div className="selected-actors">
        {formData.actors.map((actor) => (
          <div key={actor.Id} className="actor-chip">
            <span>{actor.Name}</span>
            <button
              type="button"
              className="remove-actor"
              onClick={() => handleRemoveActor(actor.Id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {movie?.id ? "Update Movie" : "Add Movie"}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
