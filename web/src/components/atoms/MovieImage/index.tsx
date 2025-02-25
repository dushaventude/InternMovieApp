import React from "react";

interface MovieImageProps {
  src: string;
  alt: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ src, alt }) => {
  return (
    <img
      src={
        "https://wallpapercave.com/wp/wp1839578.jpg"
        // || src
      }
      alt={alt}
      className="current-movie-image"
    />
  );
};

export default MovieImage;
