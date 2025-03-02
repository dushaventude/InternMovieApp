import { getBackgroundColor } from "../../../utils/helpers";
import "./styles.scss";

interface UserScoreProps {
  avgRating: number;
}

const UserScore = ({ avgRating }: UserScoreProps) => {
  return (
    <div className="userScore">
      <p
        className="scoreCircle"
        style={{ backgroundColor: getBackgroundColor(avgRating) }}
      >
        {avgRating?.toFixed(1)}
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
