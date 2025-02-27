import type React from "react";
import { useState } from "react";
import "./MovieFrom.scss";
import Button from "../../atoms/button/Button";

interface Movie {
  Id?: number;
  Title: string;
  Description: string;
  ReleaseDate: string;
  Photo: string;
}

interface MovieFormProps {
  movie?: Movie;
  onSubmit: (movie: Movie) => void;
  onCancel: () => void;
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Movie>(
    movie || {
      Title: "",
      Description: "",
      ReleaseDate: "",
      Photo: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Title.trim()) {
      newErrors.Title = "Title is required";
    }

    if (!formData.Description.trim()) {
      newErrors.Description = "Description is required";
    }

    if (!formData.ReleaseDate) {
      newErrors.ReleaseDate = "Release date is required";
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
          name="Title"
          value={formData.Title}
          onChange={handleChange}
          className={errors.Title ? "error" : ""}
        />
        {errors.Title && <span className="error-message">{errors.Title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          rows={4}
          className={errors.Description ? "error" : ""}
        />
        {errors.Description && (
          <span className="error-message">{errors.Description}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="releaseDate">Release Date</label>
        <input
          type="date"
          id="releaseDate"
          name="ReleaseDate"
          value={formData.ReleaseDate}
          onChange={handleChange}
          className={errors.ReleaseDate ? "error" : ""}
        />
        {errors.ReleaseDate && (
          <span className="error-message">{errors.ReleaseDate}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="photo">Photo URL</label>
        <input
          type="text"
          id="photo"
          name="Photo"
          value={formData.Photo}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <Button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="submit-btn">
          {movie?.Id ? "Update Movie" : "Add Movie"}
        </Button>
      </div>
    </form>
  );
};

export default MovieForm;
