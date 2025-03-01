import type React from "react";
import { useState } from "react";
import "./ActorForm.scss";
// import ImageUpload from "../ImageUpload/ImageUpload";

interface Actor {
  Id?: number;
  Name: string;
  Gender: string;
  Country: string;
  Photo: string;
}

interface ActorFormProps {
  actor?: Actor;
  onSubmit: (actor: Actor) => void;
  onCancel: () => void;
}

const ActorForm: React.FC<ActorFormProps> = ({ actor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Actor>(
    actor || {
      Name: "",
      Gender: "",
      Country: "",
      Photo: "",
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      Photo: url,
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Name.trim()) {
      newErrors.Name = "Name is required";
    }

    if (!formData.Gender) {
      newErrors.Gender = "Gender is required";
    }

    if (!formData.Country.trim()) {
      newErrors.Country = "Country is required";
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
    <form className="actor-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          className={errors.Name ? "error" : ""}
        />
        {errors.Name && <span className="error-message">{errors.Name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="Gender">Gender</label>
        <select
          id="Gender"
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          className={errors.Gender ? "error" : ""}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.Gender && (
          <span className="error-message">{errors.Gender}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="Country">Country</label>
        <input
          type="text"
          id="Country"
          name="Country"
          value={formData.Country}
          onChange={handleChange}
          className={errors.Country ? "error" : ""}
        />
        {errors.Country && (
          <span className="error-message">{errors.Country}</span>
        )}
      </div>

      {/* <div className="form-group">
        <ImageUpload
          value={formData.Photo}
          onChange={handleImageChange}
          label="Actor Photo"
        />
      </div> */}

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          {actor?.Id ? "Update Actor" : "Add Actor"}
        </button>
      </div>
    </form>
  );
};

export default ActorForm;
