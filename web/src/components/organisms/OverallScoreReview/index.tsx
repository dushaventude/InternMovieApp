import React from "react";
import "./styles.scss";

interface UserScoreProps {
  avgRating: number;
}

const getBackgroundColor = (rating: number) => {
  if (rating >= 8) return "#007a55"; // Green
  if (rating >= 5) return "#d08700"; // Orange
  return "#c70036"; // Red
};

const UserScore: React.FC<UserScoreProps> = ({ avgRating }) => {
  return (
    <div className="userScore">
      <p
        className="scoreCircle"
        style={{ backgroundColor: getBackgroundColor(avgRating) }}
      >
        {avgRating.toFixed(1)}
      </p>
      <div className="scoreText">
        <p className="scoreLabel">User Score</p>
        <p className="scoreDescription">
          {avgRating >= 8
            ? "Universal Acclaim"
            : avgRating >= 5
            ? "Mixed Reviews"
            : "Mostly Negative"}
        </p>
      </div>
    </div>
  );
};

export default UserScore;
