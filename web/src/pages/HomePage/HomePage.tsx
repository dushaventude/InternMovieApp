import "./styles.scss";
// import Carousel from "../../components/templates/Carousel";
import Carousel from "../../components/templates/NewCarousel";
import { useEffect, useState } from "react";
import Review from "../../components/templates/Review";

interface Movie {
  Id: number;
  Title: string;
  Description: string;
  Photo: string;
  IsFeatured: boolean;
  ReleaseDate: string;
}
// const movies = [
//   {
//     Id: 1,
//     Title: "Inception",
//     Description: "A mind-bending thriller about dreams within dreams.",
//     Photo:
//       "https://c4.wallpaperflare.com/wallpaper/267/487/613/inception-movies-wallpaper-preview.jpg",
//     IsFeatured: true,
//     ReleaseDate: "2010-07-16",
//   },
//   {
//     Id: 2,
//     Title: "The Dark Knight",
//     Description: "A battle between Batman and the Joker in Gotham City.",
//     Photo: "https://wallpapercave.com/wp/JUbQu94.jpg",
//     IsFeatured: true,
//     ReleaseDate: "2008-07-18",
//   },
//   {
//     Id: 3,
//     Title: "Avengers: Endgame",
//     Description: "The Avengers take a final stand against Thanos.",
//     Photo:
//       "https://c4.wallpaperflare.com/wallpaper/212/657/279/the-avengers-avengers-endgame-ant-man-avengers-endgame-black-widow-hd-wallpaper-preview.jpg",
//     IsFeatured: true,
//     ReleaseDate: "2019-04-26",
//   },
//   {
//     Id: 4,
//     Title: "Gone with the Wind",
//     Description: "A historical romance set during the American Civil War.",
//     Photo: "https://wallpapercave.com/wp/wp1839578.jpg",
//     IsFeatured: true,
//     ReleaseDate: "1939-12-15",
//   },
//   {
//     Id: 5,
//     Title: "Gladiator",
//     Description:
//       "A Roman general seeks revenge against the corrupt emperor who murdered his family.",
//     Photo: "https://wallpapercave.com/wp/wp1839579.jpg",
//     IsFeatured: true,
//     ReleaseDate: "2000-05-05",
//   },
// ];

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
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

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;
  if (movies.length === 0) return <p>No movies available</p>;

  return (
    <>
      <Carousel movies={movies} />;
      <Review />
    </>
  );
};

export default HomePage;
