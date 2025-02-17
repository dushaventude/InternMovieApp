//using System;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http.HttpResults;
//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using MovieApp.Api.Controllers;
//using MovieApp.Business.DTOs.MovieDtos;
//using MovieApp.Business.Services;
//using Xunit;
//using Microsoft.AspNetCore.Mvc;
//using MovieApp.Tests.MockData;
//using static System.Net.Mime.MediaTypeNames;
//using MovieApp.Data.Entities;

//namespace MovieApp.Tests
//{
//    public class MovieControllerTests
//    {
//        private readonly MovieController _controller;
//        private readonly Mock<IMovieService> _movieServiceMock;

//        public MovieControllerTests()
//        {
//            _movieServiceMock = new Mock<IMovieService>();
//            _controller = new MovieController(_movieServiceMock.Object);
//        }


//        [Fact]
//        public async Task GetByIdAsync_ReturnsFound()
//        {
//            const int Id = 1;

//            var movieService = new Mock<IMovieService>();
//            movieService.Setup(_ => _.GetMovieById(Id)).ReturnsAsync(MoviesMockData.GetMovieByIdFromMockData(Id));
//            var sut = new MovieController(movieService.Object);

//            var response = await sut.GetMovieById(Id);

//            var foundResult = Assert.IsType<OkObjectResult>(response);
//            Assert.NotNull(foundResult.Value);

//            var releaseDate = new DateOnly(2010, 7, 16);
//            var foundMovie = foundResult.Value as MovieRequestDto;

//            Assert.Equal("Inception", foundMovie.Title);
//            Assert.Equal("A mind-bending thriller where dream invasion is possible.", foundMovie.Description);
//            Assert.Equal("inception.jpg", foundMovie.Photo);
//            Assert.True(foundMovie.IsFeatured);
//            Assert.Equal(releaseDate, foundMovie.ReleaseDate);
//        }
//        [Fact]
//        public async Task GetByIdAsync_ReturnsNotFound()
//        {
//            const int Id = 4;
//            var movieService = new Mock<IMovieService>();
//            movieService.Setup(_ => _.GetMovieById(Id)).ReturnsAsync(MoviesMockData.GetMovieByIdFromMockData(Id));
//            var sut = new MovieController(movieService.Object);

//            var response = await sut.GetMovieById(Id);
//            Assert.IsType<NotFoundObjectResult>(response);
//        }

//        [Fact]
//        public async Task AddMovieAsync_ReturnsCreated()
//        {
//            MovieDto movie = new()
//            {
//                Title = "Parasite",
//                Description = "A dark comedy thriller that explores class disparities as a poor family cunningly infiltrates a wealthy household.",
//                IsFeatured = true,
//                Photo = "parasite.jpg",
//                ReleaseDate = new DateOnly(2019, 5, 30),
//            };

//            var movieService = new Mock<IMovieService>();
//            movieService.Setup(_ => _.CreateMovie(movie)).ReturnsAsync(MoviesMockData.CreateMovieToMockData(movie));

//            var sut = new MovieController(movieService.Object);

//            var response = await sut.CreateMovie(movie);

//            var createdResult = Assert.IsType<CreatedAtActionResult>(response);
//            Assert.NotNull(createdResult.Value);
//            Assert.IsType<MovieRequestDto>(createdResult.Value);

//            var createdMovie = createdResult.Value as MovieRequestDto;

//            var releaseDate = new DateOnly(2019, 5, 30);

//            Assert.Equal(4,createdMovie.Id);
//            Assert.Equal("Parasite", createdMovie.Title);
//            Assert.Equal("A dark comedy thriller that explores class disparities as a poor family cunningly infiltrates a wealthy household.", createdMovie.Description);
//            Assert.Equal("parasite.jpg", createdMovie.Photo);
//            Assert.True(createdMovie.IsFeatured);
//            Assert.Equal(releaseDate,createdMovie.ReleaseDate);
//        }

//        [Fact]
//        public async Task AddMovieAsync_ReturnsBadRequest()
//        {
//            var movieService = new Mock<IMovieService>();
//            var sut = new MovieController(movieService.Object);

//            var response = await sut.CreateMovie(null);
//            Assert.IsType<BadRequestObjectResult>(response);
//        }

//        [Fact]
//        public async Task UpdateMovieAsync_ReturnsOk()
//        {
//            const int movieId = 1;

//            MovieDto movie = new MovieDto
//            {
//                Title = "The Shawshank Redemption",
//                Description = "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
//                IsFeatured = true,
//                Photo = "shawshank.jpg",
//                ReleaseDate = new DateOnly(1994, 9, 23)
//            };

//            //_movieServiceMock.Setup(service => service.UpdateMovie(movieId, movie));
//            var movieService = new Mock<IMovieService>();
//            movieService.Setup(_ => _.UpdateMovie(movieId,movie)).ReturnsAsync(MoviesMockData.UpdateMovieFromMockData(movieId,movie));

//            var sut = new MovieController(movieService.Object);

//            var response = await sut.UpdateMovie(movieId,movie);
//            //var response = await _controller.UpdateMovie(movieId ,movie);

//            var updatedResult = Assert.IsType<OkObjectResult>(response);

//            Assert.NotNull(updatedResult.Value);

//            Assert.IsType<MovieRequestDto>(updatedResult.Value);
//            var releaseDate = new DateOnly(1994, 9, 23);
//            var updatedMovie = updatedResult.Value as MovieRequestDto;

//            Assert.Equal("The Shawshank Redemption", updatedMovie.Title);
//            Assert.Equal("Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.", updatedMovie.Description);
//            Assert.Equal("shawshank.jpg", updatedMovie.Photo);
//            Assert.True(updatedMovie.IsFeatured);
//            Assert.Equal(releaseDate, updatedMovie.ReleaseDate);
//        }

//        [Fact]
//        public async Task UpdateMovieAsync_ReturnsNotFound()
//        {
//            const int Id = 4;
//            var movieService = new Mock<IMovieService>();
//            movieService.Setup(_ => _.GetMovieById(Id)).ReturnsAsync(MoviesMockData.GetMovieByIdFromMockData(Id));
//            var sut = new MovieController(movieService.Object);

//            var response = await sut.GetMovieById(Id);
//            Assert.IsType<NotFoundObjectResult>(response);
//        }
//    }
//}