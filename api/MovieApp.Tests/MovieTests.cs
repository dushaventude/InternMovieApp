using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MovieApp.Api.Controllers;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Business.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace MovieApp.Tests
{
    public class MovieTests
    {
        private readonly MovieController _controller;
        private readonly Mock<IMovieService> _movieServiceMock;

        public MovieTests()
        {
            _movieServiceMock = new Mock<IMovieService>();
            _controller = new MovieController(_movieServiceMock.Object);
        }

        [Fact]
        public async Task AddMovieSuccess()
        {
            MovieDto movie = new()
            {
                Title = "AAA",
                Description = "Some description",
                IsFeatured = false,
                Photo = "photo.jpg",
                ReleaseDate = new DateOnly(),
            };

            _movieServiceMock
                .Setup(service => service.CreateMovie(movie))
                .ReturnsAsync(movie);

            var response = await _controller.Create(movie);

            var createdResult = Assert.IsType<CreatedAtActionResult>(response);
            Assert.NotNull(createdResult.Value);
            Assert.IsType<MovieRequestDto>(createdResult.Value);

            var createdMovie = createdResult.Value as MovieRequestDto;

            Assert.Equal("AAA", createdMovie.Title);
            Assert.Equal("Some description", createdMovie.Description);
            Assert.Equal("photo.jpg", createdMovie.Photo);
            Assert.False(createdMovie.IsFeatured);
            Assert.Equal(new DateOnly(),createdMovie.ReleaseDate);
        }

        [Fact]
        public async Task UpdateMovieSuccess()
        {
            const int movieId = 1;

            MovieDto movie = new()
            {
                Title = "AAA",
                Description = "BBB",
                IsFeatured = false,
                Photo = "CCC",
                ReleaseDate = new DateOnly(),
            };


            _movieServiceMock.
                Setup(service => service.UpdateMovie(movieId, movie)).
                ReturnsAsync(movie);

            var response = await _controller.Update(movieId ,movie);

            var updatedResult = Assert.IsType<OkObjectResult>(response);

            Assert.NotNull(updatedResult.Value);

            Assert.IsType<UpdateMovieDto>(updatedResult.Value);

            var updatedMovie = updatedResult.Value as UpdateMovieDto;

            Assert.Equal("AAA", updatedMovie.Title);
            Assert.Equal("BBB", updatedMovie.Description);
            Assert.Equal("CCC", updatedMovie.Photo);
            Assert.False(updatedMovie.IsFeatured);
            Assert.Equal(new DateOnly(), updatedMovie.ReleaseDate);
        }
    }
}