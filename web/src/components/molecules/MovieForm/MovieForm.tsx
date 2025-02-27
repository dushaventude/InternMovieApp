"use client";

import type React from "react";
import { useState, useEffect } from "react";
import "./MovieForm.scss";
import ImageUpload from "../ImageUpload/ImageUpload";
import ActorSearch from "../ActorSearch/ActorSearch";

interface Actor {
  id: number;
  name: string;
  photoUrl: string;
}

interface Movie {
  id?: number;
  title: string;
  description: string;
  releaseDate: string;
  photoUrl: string;
  actors: Actor[];
}

interface MovieFormProps {
  movie?: Movie;
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

  useEffect(() => {
    if (searchTerm) {
      // Simulating an API call to search for actors
      // In a real application, you would call your backend API here
      const mockApiCall = setTimeout(() => {
        const results = mockActors.filter((actor) =>
          actor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      }, 300);

      return () => clearTimeout(mockApiCall);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleImageChange = (url: string) => {
    setFormData({
      ...formData,
      photoUrl: url,
    });
  };

  const handleActorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddActor = (actor: Actor) => {
    if (!formData.actors.some((a) => a.id === actor.id)) {
      setFormData({
        ...formData,
        actors: [...formData.actors, actor],
      });
    }
    setSearchTerm("");
  };

  const handleRemoveActor = (actorId: number) => {
    setFormData({
      ...formData,
      actors: formData.actors.filter((a) => a.id !== actorId),
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.releaseDate) {
      newErrors.releaseDate = "Release date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
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
        <ImageUpload
          value={formData.photoUrl}
          onChange={handleImageChange}
          label="Movie Poster"
        />
      </div>

      <div className="form-group">
        <label htmlFor="actorSearch">Add Actors</label>
        <ActorSearch
          searchTerm={searchTerm}
          onSearchChange={handleActorSearch}
          searchResults={searchResults}
          onActorSelect={handleAddActor}
        />
      </div>

      {formData.actors.length > 0 && (
        <div className="form-group">
          <label>Added Actors</label>
          <ul className="added-actors-list">
            {formData.actors.map((actor) => (
              <li key={actor.id} className="added-actor">
                <img
                  src={actor.photoUrl || "/placeholder.svg"}
                  alt={actor.name}
                  className="actor-thumbnail"
                />
                <span>{actor.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveActor(actor.id)}
                  className="remove-actor-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

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

// Mock data for actors (replace with actual API call in a real application)
const mockActors: Actor[] = [
  { id: 1, name: "Tom Hanks", photoUrl: "https://example.com/tom-hanks.jpg" },
  {
    id: 2,
    name: "Meryl Streep",
    photoUrl: "https://example.com/meryl-streep.jpg",
  },
  {
    id: 3,
    name: "Denzel Washington",
    photoUrl: "https://example.com/denzel-washington.jpg",
  },
  {
    id: 4,
    name: "Viola Davis",
    photoUrl: "https://example.com/viola-davis.jpg",
  },
  {
    id: 5,
    name: "Leonardo DiCaprio",
    photoUrl: "https://example.com/leonardo-dicaprio.jpg",
  },
];

export default MovieForm;
