import React from "react";
import styles from "./smallCard.module.scss";
import { Link } from "react-router-dom";
import SmallCardSkeleton from "../Skeleton/SmallCardSkeleton"; // Import the skeleton component

interface SmallCardProps {
  id: number;
  title: string;
  image: string;
  releaseDate?: number | string;
  rating?: number;
  actor?: {
    name: string;
    profilePhoto: string;
    knownFor?: string[];
  };
  isLoading?: boolean; // Add a loading prop
}

const SmallCard: React.FC<SmallCardProps> = ({
  id,
  title,
  image,
  releaseDate,
  rating,
  actor,
  isLoading, // Destructure the loading prop
}) => {
  if (isLoading) {
    return <SmallCardSkeleton />; // Render the skeleton if loading
  }

  return (
    <Link to={`/movies/${id}`} className="link">
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
    </Link>
  );
};

export default SmallCard;
