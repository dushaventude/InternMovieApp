using System;
using System.Collections.Generic;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Data.Entities;

namespace MovieApp.Tests.MockData
{
    public static class MoviesMockData
    {
        private static List<MovieRequestDto> _movieMockData = new List<MovieRequestDto>
        {
            new MovieRequestDto
            {
                Id = 1,
                Title = "Inception",
                Description = "A mind-bending thriller where dream invasion is possible.",
                Photo = "inception.jpg",
                IsFeatured = true,
                ReleaseDate = new DateOnly(2010, 7, 16)
            },
            new MovieRequestDto
            {
                Id = 2,
                Title = "The Matrix",
                Description = "A hacker discovers the reality he knows is a simulated reality.",
                Photo = "matrix.jpg",
                IsFeatured = true,
                ReleaseDate = new DateOnly(1999, 3, 31)
            },
            new MovieRequestDto
            {
                Id = 3,
                Title = "Interstellar",
                Description = "A team of explorers travel through a wormhole in search of a new home for humanity.",
                Photo = "interstellar.jpg",
                IsFeatured = false,
                ReleaseDate = new DateOnly(2014, 11, 7)
            }
        };
        public static List<MovieRequestDto> GetMovieMockData()
        {
            return _movieMockData;
        }

        public static MovieRequestDto GetMovieByIdFromMockData(int id)
        {
            return _movieMockData.Find(movie => movie.Id == id);
        }

        public static MovieRequestDto CreateMovieToMockData(MovieDto movie)
        {
            var newMovie = new MovieRequestDto
            {
                Id = _movieMockData.Count + 1,
                Title = movie.Title,
                Description = movie.Description,
                Photo = movie.Photo,
                IsFeatured = movie.IsFeatured,
                ReleaseDate = movie.ReleaseDate,
            };

            _movieMockData.Add(newMovie);
            return newMovie;
        }

        public static MovieRequestDto UpdateMovieFromMockData(int Id, MovieDto movie)
        {
            MovieRequestDto existingMovie = GetMovieByIdFromMockData(Id);
            if (existingMovie == null)
            {
                return null;
            }

            existingMovie.Title = movie.Title;
            existingMovie.Description = movie.Description;
            existingMovie.Photo = movie.Photo;
            existingMovie.IsFeatured = movie.IsFeatured;
            existingMovie.ReleaseDate = movie.ReleaseDate;

            return existingMovie;
        }
    }
}