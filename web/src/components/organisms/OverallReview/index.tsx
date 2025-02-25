import React from "react";
import "./styles.scss";

interface RatingProps {
  positive: number;
  mixed: number;
  negative: number;
}

const RatingBar: React.FC<RatingProps> = ({ positive, mixed, negative }) => {
  const total = positive + mixed + negative;

  const ratings = [
    { label: "Positive", count: positive, color: "#4caf50" },
    { label: "Mixed", count: mixed, color: "#d08700" },
    { label: "Negative", count: negative, color: "#c70036" },
  ];

  return (
    <div className="ratingBar">
      {ratings.map(({ label, count, color }) => {
        const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : "0";

        return (
          <React.Fragment key={label}>
            <div className="ratingBarItem">
              <p>{label}</p>
            </div>
            <div className="progressBarWrapper">
              <div
                className="progressBar"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              ></div>
            </div>
            <div className="ratingBarItem">
              <p className="progressBarText">
                {count} ({percentage}%)
              </p>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RatingBar;
