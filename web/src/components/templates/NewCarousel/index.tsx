// import React, { useState, useEffect } from "react";
// import "./styles.scss";

// interface Movie {
//   Id: number;
//   Title: string;
//   Photo: string;
//   ReleaseDate: string;
//   Description: string;
//   IsFeatured: boolean;
// }

// interface CarouselProps {
//   movies: Movie[];
// }

// const Carousel: React.FC<CarouselProps> = ({ movies }) => {
//   const [offset, setOffset] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setOffset((prevOffset) => prevOffset - 210);
//       //   movies.push({
//       //     Id: 7,
//       //     Title: "Inception",
//       //     Description: "A mind-bending thriller about dreams within dreams.",
//       //     Photo:
//       //       "https://image.tmdb.org/t/p/original/ii8QGacT3MXESqBckQlyrATY0lT.jpg",
//       //     IsFeatured: true,
//       //     ReleaseDate: "2010-07-16",
//       //   });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {/* <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           width: "fit-content",
//           margin: "0 auto",
//         }}
//       >
//         {movies.map((movie) => (
//           <img
//             key={movie.Id}
//             src={movie.Photo}
//             alt={movie.Title}
//             style={{ width: "200px", objectFit: "contain" }}
//           />
//         ))}
//       </div> */}
//       <div
//         style={{
//           display: "flex",
//           overflowX: "hidden",
//           gap: "10px",
//           width: "fit-content",
//           margin: "0 auto",
//         }}
//       >
//         {movies.map((movie) => (
//           <img
//             key={movie.Id}
//             src={movie.Photo}
//             alt={movie.Title}
//             style={{
//               width: "200px",
//               objectFit: "contain",
//               transform: `translateX(${offset}px)`,
//               //   transform: `translateX(-210px)`,
//               transition: "transform 1s ease-in-out",
//             }}
//           />
//         ))}
//       </div>

//       <div
//         onClick={() => {
//           movies.shift();
//         }}
//       >
//         ClickMetoDelete
//       </div>
//       {/* <div
//         onClick={() => {
//           movies.push({
//             Id: 1,
//             Title: "Inception",
//             Description: "A mind-bending thriller about dreams within dreams.",
//             Photo:
//               "https://image.tmdb.org/t/p/original/ii8QGacT3MXESqBckQlyrATY0lT.jpg",
//             IsFeatured: true,
//             ReleaseDate: "2010-07-16",
//           });
//         }}
//       >
//         ClickMe
//       </div> */}
//     </>
//   );
// };

// export default Carousel;

// import React, { useState, useEffect } from "react";
// import "./styles.scss";

// interface Movie {
//   Id: number;
//   Title: string;
//   Photo: string;
//   ReleaseDate: string;
//   Description: string;
//   IsFeatured: boolean;
// }

// interface CarouselProps {
//   movies: Movie[];
// }

// const Carousel: React.FC<CarouselProps> = ({ movies: initialMovies }) => {
//   const [movies, setMovies] = useState<Movie[]>(initialMovies);
//   const [offset, setOffset] = useState(0);
//   const [currentMovie, setCurrentMovie] = useState(movies[0]);
//   const visibleMovies = movies.length - 1;
//   const movieWidth = 210;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMovies((prevMovies) => {
//         if (prevMovies.length > 0) {
//           const firstMovie = prevMovies[0];
//           setCurrentMovie(firstMovie);
//           const restMovies = prevMovies.slice(1);
//           return [...restMovies, firstMovie];
//         }
//         return prevMovies;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     setOffset(0);
//   }, [movies]);

//   return (
//     <div
//       style={{
//         position: "relative",
//         height: "80vh",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundImage: `url(${currentMovie.Photo})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           zIndex: -1,
//           maskImage:
//             "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.5), rgba(0,0,0,0))",
//           maskMode: "alpha",
//           filter: "blur(5px)",
//         }}
//       />
//       <div
//         style={{
//           position: "relative",
//           height: "75vh",
//           width: "85%",
//           display: "flex",
//           justifySelf: "center",
//         }}
//       >
//         <img
//           src={currentMovie.Photo}
//           style={{
//             height: "100%",
//             width: "100%",

//             // objectFit: "contain",
//             display: "flex",
//             justifySelf: "center",
//             padding: "20px 0",
//             filter: "brightness(50%)",
//             margin: "0 auto",
//           }}
//         />
//         <div
//           style={{
//             width: "50%",
//             position: "absolute",
//             top: "50%",
//             left: "20%",
//             transform: "translate(-20%, -50%)",
//             color: "white",
//             display: "flex",
//             gap: "20px",
//           }}
//         >
//           {" "}
//           <img src={currentMovie.Photo} style={{ height: "150px" }} />
//           <div
//             style={{
//               fontFamily: "Roboto, serif",
//               display: "flex",
//               flexDirection: "column",
//               gap: "10px",
//               //   justifyContent: "center",
//             }}
//           >
//             <p
//               style={{
//                 fontSize: "24px",
//                 textTransform: "uppercase",
//                 margin: "0",
//               }}
//             >
//               {currentMovie.Title}
//             </p>
//             <p
//               style={{
//                 fontSize: "16px",
//                 // textTransform: "uppercase",
//                 margin: "0",
//               }}
//             >
//               {currentMovie.Description}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: "50%",
//           transform: "translateX(-50%)",
//           overflowX: "hidden",
//           width: `${visibleMovies * movieWidth + 46}px`,
//           margin: "0 auto",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             width: `${movies.length * movieWidth}px`,
//             transform: `translateX(${offset}px)`,
//             transition: "transform 0.5s ease-in-out",
//           }}
//         >
//           {movies.map((movie) => (
//             <img
//               key={movie.Id}
//               src={movie.Photo}
//               alt={movie.Title}
//               style={{
//                 width: "200px",
//                 objectFit: "contain",
//                 border: "2px solid white",
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

import React, { useState, useEffect } from "react";
import "./styles.scss";

interface Movie {
  Id: number;
  Title: string;
  Photo: string;
  ReleaseDate: string;
  Description: string;
  IsFeatured: boolean;
}

interface CarouselProps {
  movies: Movie[];
}

const Carousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [offset, setOffset] = useState(0);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const visibleMovies = movies.length - 1;
  const movieWidth = 210;

  useEffect(() => {
    const interval = setInterval(() => {
      setMovies((prevMovies) => {
        if (prevMovies && prevMovies.length > 0) {
          const firstMovie = prevMovies[0];
          setCurrentMovie(firstMovie);
          const restMovies = prevMovies.slice(1);
          return [...restMovies, firstMovie];
        }
        return prevMovies;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setOffset(0);
    if (movies.length > 0) {
      setCurrentMovie(movies[0]);
    }
  }, [movies]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("http://localhost:5140/api/Movie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Query: "",
            ReleaseDateFrom: "1900-02-22",
            ReleaseDateTo: "2025-02-22",
            IsFeatured: true,
            PageSize: 6,
            PageNumber: 1,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.Response || data.Response.length === 0) {
          setMovies([]);
        } else {
          console.log(data.Response);
          setMovies(data.Response);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);
  if (!movies || (movies.length === 0 && currentMovie == null))
    return <p>No movies available</p>;
  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;
  if (movies.length === 0 && currentMovie == null)
    return <p>No movies available</p>;

  return (
    <div className="carousel-container">
      <div
        className="carousel-background"
        style={{
          backgroundImage: currentMovie ? `url(${currentMovie.Photo})` : "none",
        }}
      />
      <div className="carousel-main">
        {currentMovie && (
          <img src={currentMovie.Photo} alt={currentMovie.Title} />
        )}
        {currentMovie && (
          <div className="carousel-content">
            <img src={currentMovie.Photo} alt={currentMovie.Title} />
            <div className="carousel-text">
              <p className="carousel-title">{currentMovie.Title}</p>
              <p className="carousel-description">{currentMovie.Description}</p>
            </div>
          </div>
        )}
      </div>
      <div
        className="carousel-thumbnails"
        // style={{ width: `${visibleMovies * movieWidth + 46}px` }}
      >
        <div
          className="carousel-thumbnails-wrapper"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {movies.map((movie, i) => (
            <img
              key={movie.Id}
              src={movie.Photo}
              alt={movie.Title}
              className={`carousel-thumbnail ${
                i == movies.length - 1 ? "hidden" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
