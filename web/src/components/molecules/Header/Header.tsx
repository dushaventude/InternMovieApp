import React, { useEffect, useState } from "react";
import "./styles.scss";
import Button from "../../atoms/button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/index";
import {
  clearSearchMovies,
  fetchSearchMovies,
} from "../../../store/features/movies/movieSlice";
import { getFullYear } from "../../../utils/helpers";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { searchMovies } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (query)
      dispatch(
        fetchSearchMovies({
          Query: query,
          ReleaseDateFrom: "1900-02-25",
          ReleaseDateTo: "2025-02-25",
          IsFeatured: true,
          PageSize: 6,
          PageNumber: 1,
        })
      );
    console.log(query);
  }, [dispatch, query]);

  console.log(searchMovies);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (pathname == "/login" || pathname == "/register" || pathname == "/resetPw")
    return null;

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">Movie Hub</h1>
        </div>
        <div className="header-center">
          <div className="menu-container">
            <div className="menu-icon_wrapper" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="menu-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <p className="menu-toggle">Menu</p>
            </div>
            <nav className={`nav ${isOpen ? "open" : ""}`}>
              <a href="/actors">Actors</a>
              <a href="/movies">Movies</a>
            </nav>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search for any movies"
              className="search-bar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-query-results">
              {searchMovies.Response &&
                searchMovies.Response.map((movie) => (
                  <div
                    className="search-query-result"
                    onClick={() => {
                      navigate(`/movies/${movie.Id}`);
                      setQuery("");
                      dispatch(clearSearchMovies());
                    }}
                  >
                    <img src={movie.Photo} />
                    <div className="search-query-result-info">
                      <p>{movie.Title}</p>
                      <p>{getFullYear(movie.ReleaseDate)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="header-right">
          <Button variant="primary" type="submit" size="large">
            Sign In
          </Button>
        </div>{" "}
      </div>
    </header>
  );
};

export default Header;
