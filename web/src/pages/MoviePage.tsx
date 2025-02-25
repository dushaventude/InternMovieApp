import * as React from "react";
import { useEffect, useState } from "react";
import HeroSection from "../components/organisms/HeroSection";
import { useParams } from "react-router-dom";
interface Movie {
  id: number;
  Title: string;
  Description: string;
  Photo: string;
  PhotoUrlList: string;
  AverageRating: number;
  ReleaseDate: string;
}

const MoviePage: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = useParams<{ id: string }>();
  console.log(id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:5140/api/movie/${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeroSection
        title={movie.Title}
        description={movie.Description}
        photo={movie.Photo}
        imageUrl={movie.PhotoUrlList}
        averageRating={movie.AverageRating}
        releaseDate={movie.ReleaseDate}
      />
    </div>
  );
};

export default MoviePage;
