import React, { useEffect, useState } from "react";
import "./styles.scss";
import { fetchMoviesCarousel } from "../../../store/features/movies/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/index";
import { getFullYear } from "../../../utils/helpers";

const Carousel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { carouselMovies } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(
      fetchMoviesCarousel({
        Query: "",
        ReleaseDateFrom: "1900-02-25",
        ReleaseDateTo: "2025-02-25",
        IsFeatured: true,
        PageSize: 5,
        PageNumber: 1,
      })
    );
  }, [dispatch]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselMovies.Response.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselMovies.Response.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselMovies?.Response.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselMovies.Response?.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-flexbox">
        <div className="carousel-slider">
          <button className="btn-chevron btn-chevron-left" onClick={prevSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="chevron"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div
            className="carousel-slider-movies"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselMovies.Response?.map((movie, index: number) => (
              <div
                key={index}
                className={`carousel-slide ${
                  index === currentIndex ? "active" : "inactive"
                }`}
              >
                {/* <img src={movie?.PhotoUrlList[0]} className="carousel-image" /> */}
                <div className="carousel-info">
                  <img src={movie.Photo} />
                  <div className="carousel-info-movie">
                    <p className="title">{movie.Title}</p>
                    <p className="description">{movie.Description}</p>
                    <p>{getFullYear(movie.ReleaseDate)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-chevron btn-chevron-right" onClick={nextSlide}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="chevron"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <div className="carousel-upnext">
          <p className="upnext-title">
            Up Next
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="upnext-chevron"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </p>
          <div className="upnext-cards">
            {carouselMovies.Response?.map((movie) => (
              <div className="upnext-card">
                <img src={movie.Photo} />
                <div className="upnext-card-info">
                  <p>{movie.Title}</p>
                  <p>{getFullYear(movie.ReleaseDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
