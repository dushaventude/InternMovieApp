import React from "react";
import "./styles.scss";

interface MovieInfoProps {
  title: string;
  date: string;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ title, date }) => {
  return (
    <div className="movie-info">
      <h2>{title}</h2>
      <p>Release Date: {date}</p>
    </div>
  );
};

export default MovieInfo;
