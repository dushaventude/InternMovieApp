import React from "react";
import styles from "./smallCard.module.scss";

interface SmallCardProps {
  title: string;
  image: string;
  releaseDate?: string;
  rating?: number;
  actor?: {
    name: string;
    profilePhoto: string;
    knownFor?: string[];
  };
}

const SmallCard: React.FC<SmallCardProps> = ({
  title,
  image,
  releaseDate,
  rating,
  actor,
}) => {
  return (
    <div className={`${styles.card} ${actor ? styles.actorCard : ""}`}>
      {actor ? (
        <div className={styles.actorContainer}>
          <img
            src={actor.profilePhoto}
            alt={actor.name}
            className={styles.roundedImage}
          />
          <h3 className={styles.actorName}>{actor.name}</h3>
          {actor.knownFor && (
            <div className={styles.knownFor}>
              <span>Known for:</span>
              {actor.knownFor.join(", ")}
            </div>
          )}
        </div>
      ) : (
        <>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.details}>
            <h3 className={styles.title}>{title}</h3>
            {releaseDate && (
              <p className={styles.releaseDate}>Release: {releaseDate}</p>
            )}
            {rating && <p className={styles.rating}>⭐ {rating}/10</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default SmallCard;
