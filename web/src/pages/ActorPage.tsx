"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { RootState } from "../store/index";
import { fetchActorById } from "../store/features/actors/actorSlice";
import { User } from "lucide-react";
import "./actor-page.scss";

const ActorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);

  const { actor, loading } = useAppSelector((state: RootState) => state.actors);

  useEffect(() => {
    if (id) dispatch(fetchActorById(Number(id)));
  }, [id, dispatch]);

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading || !actor) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="actor-page">
      <div className="actor-card">
        <div className="actor-card__content">
          <div className="actor-card__image-container">
            {!imageError && actor.Photo ? (
              <img
                src={actor.Photo || "/placeholder.svg"}
                alt={actor.Name}
                className="actor-card__image"
                onError={handleImageError}
              />
            ) : (
              <div className="actor-card__placeholder">
                <User className="actor-card__placeholder-icon" />
                
              </div>
            )}
          </div>
          <div className="actor-card__details">
            <div className="actor-card__label">Actor Profile</div>
            <h1 className="actor-card__name">{actor.Name}</h1>
            <div className="actor-card__info">
              <div className="actor-card__info-item">
                <span className="actor-card__info-label">Country:</span>{" "}
                {actor.Country || "Not available"}
              </div>
              <div className="actor-card__info-item">
                <span className="actor-card__info-label">Gender:</span>{" "}
                {actor.Gender || "Not specified"}
              </div>
            </div>
            {actor.Bio && (
              <div className="actor-card__bio">
                <h2 className="actor-card__bio-title">Biography</h2>
                <p className="actor-card__bio-text">{actor.Bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
