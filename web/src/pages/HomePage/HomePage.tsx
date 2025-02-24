import "./styles.scss";
import Carousel from "../../components/templates/Carousel";
const movies = [
  {
    Id: 1,
    Title: "Inception",
    Description: "A mind-bending thriller about dreams within dreams.",
    Photo:
      "https://c4.wallpaperflare.com/wallpaper/267/487/613/inception-movies-wallpaper-preview.jpg",
    IsFeatured: true,
    ReleaseDate: "2010-07-16",
  },
  {
    Id: 2,
    Title: "The Dark Knight",
    Description: "A battle between Batman and the Joker in Gotham City.",
    Photo: "https://wallpapercave.com/wp/JUbQu94.jpg",
    IsFeatured: true,
    ReleaseDate: "2008-07-18",
  },
  {
    Id: 3,
    Title: "Avengers: Endgame",
    Description: "The Avengers take a final stand against Thanos.",
    Photo:
      "https://c4.wallpaperflare.com/wallpaper/212/657/279/the-avengers-avengers-endgame-ant-man-avengers-endgame-black-widow-hd-wallpaper-preview.jpg",
    IsFeatured: true,
    ReleaseDate: "2019-04-26",
  },
  {
    Id: 4,
    Title: "Gone with the Wind",
    Description: "A historical romance set during the American Civil War.",
    Photo: "https://wallpapercave.com/wp/wp1839578.jpg",
    IsFeatured: true,
    ReleaseDate: "1939-12-15",
  },
  {
    Id: 5,
    Title: "Gladiator",
    Description:
      "A Roman general seeks revenge against the corrupt emperor who murdered his family.",
    Photo: "https://wallpapercave.com/wp/wp1839579.jpg",
    IsFeatured: true,
    ReleaseDate: "2000-05-05",
  },
];

const HomePage: React.FC = () => {
  return <Carousel movies={movies} />;
};

export default HomePage;
