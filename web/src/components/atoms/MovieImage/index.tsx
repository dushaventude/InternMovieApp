import React from "react";

interface MovieImageProps {
  src: string;
  alt: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="current-movie-image" />;
};

export default MovieImage;
