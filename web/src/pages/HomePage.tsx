import React from "react";
import SmallCard from "../components/molecules/smallCard";
import movies from "../data/MovieData";
import actors from "../data/ActorsData";

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Featured Movies</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "40px",
          justifyContent: "center",
        }}
      >
        {movies
          .filter((movie) => movie.isFeatured)
          .map((movie) => (
            <SmallCard
              key={movie.title}
              title={movie.title}
              image={movie.image}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
            />
          ))}
      </div>

      <h1>Popular Actors</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" ,justifyContent: "center"}}>
        {actors.map((actor) => (
          <SmallCard
            key={actor.name}
            title={actor.name}
            image={actor.profilePhoto}
            actor={actor}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
