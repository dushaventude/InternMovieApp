import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import Button from "../../atoms/button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/index";
import {
  clearSearchMovies,
  fetchSearchMovies,
} from "../../../store/features/movies/movieSlice";
import { getFullYear } from "../../../utils/helpers";
import { Avatar } from "../../atoms/avatar/Avatar";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { searchMovies } = useSelector((state: RootState) => state.movies);
  const { user, role } = useSelector((state: RootState) => state.user);
  console.log(role);
  useEffect(() => {
    let isMounted = true;

    if (query !== "") {
      dispatch(
        fetchSearchMovies({
          Query: query,
          ReleaseDateFrom: "1900-02-25",
          ReleaseDateTo: "2025-02-25",
          IsFeatured: true,
          PageSize: 6,
          PageNumber: 1,
        })
      ).then(() => {
        if (!isMounted) return;
      });
    }
    if (query == "") {
      clearSearchMovies();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, query]);

  // console.log(searchMovies);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        dispatch(clearSearchMovies());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

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
          <div className="search-container" ref={searchRef}>
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
              {Array.isArray(searchMovies.Response) &&
                searchMovies.Response.length > 0 && (
                  <Link
                    to={`movies?query=${query}`}
                    className="search-movies-count"
                    onClick={() => {
                      setQuery("");
                      dispatch(clearSearchMovies());
                    }}
                  >
                    <p className="search-movies-count">
                      {searchMovies.TotalCount} Movies found
                    </p>
                  </Link>
                )}
            </div>
          </div>
        </div>
        <div className="header-right">
          {user?.id ? (
            <User admin={role} />
          ) : (
            <Button
              variant="primary"
              type="submit"
              size="large"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

function User({ admin }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="user-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="user-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
      {isHovered && (
        <div className="user-controls">
          {admin === "admin" && (
            <Link to={"/dashboard"} className="link">
              <p>Dashboard</p>
            </Link>
          )}
          <p>Sign out</p>
        </div>
      )}
    </div>
  );
}
