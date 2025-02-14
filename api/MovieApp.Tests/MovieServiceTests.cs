using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.Extensions.Logging;
using Moq;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;

namespace MovieApp.Tests
{
    public class MovieServiceTests
    {
        private readonly MovieService _movieService;
        private readonly Mock<IMovieRepository> _mockMovieRepository;
        private readonly Mock<ILogger<MovieService>> _mockLogger;
        private readonly Mock<IMapper> _mockMapper;



        public MovieServiceTests()
        {
            _mockMovieRepository = new Mock<IMovieRepository>();
            _mockLogger = new Mock<ILogger<MovieService>>();
            _mockMapper = new Mock<IMapper>();

            _movieService = new MovieService(_mockMovieRepository.Object, _mockMapper.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task GetMoviesAsync_WhenCalled_ReturnsListOfMovies()
        {
            // Arrange
            var mockMovies = new List<Movie>
            {
                new Movie
                {
                    Id = 1,
                    Title = "Movie 1",
                    Description = "Description 1",
                    Photo = "photo1.jpg",
                    IsFeatured = true,
                    ReleaseDate = new DateOnly(2021, 1, 1),

                },
                new Movie
                {
                    Id = 2,
                    Title = "Movie 2",
                    Description = "Description 2",
                    Photo = "photo2.jpg",
                    IsFeatured = true,
                    ReleaseDate = new DateOnly(2021, 1, 2),
                }
            };
            var mockMoviesInfo = new List<MovieInfo>
            {
                new MovieInfo
                {
                    Id = 1,
                    Title = "Movie 1",
                    Description = "Description 1",
                    Photo = "photo1.jpg",
                    IsFeatured = true,
                    ReleaseDate = new DateOnly(2021, 1, 1),

                },
                new MovieInfo
                {
                    Id = 2,
                    Title = "Movie 2",
                    Description = "Description 2",
                    Photo = "photo2.jpg",
                    IsFeatured = true,
                    ReleaseDate = new DateOnly(2021, 1, 2),
                }
            };
            _mockMovieRepository.Setup(x => x.GetMoviesAsync()).ReturnsAsync(mockMovies);
            _mockMapper.Setup(x => x.Map<List<MovieInfo>>(mockMovies)).Returns(mockMoviesInfo);
            // Act
            var result = await _movieService.GetMoviesAsync();
            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
        }


        [Fact]
        public async Task GetMoviesAsync_WhenMoviesDoesNotExists_ReturnsNull()
        {
            // Arrange
            List<Movie> mockMovies = null;
            List<MovieInfo> mockMoviesInfo = null;
            _mockMovieRepository.Setup(x => x.GetMoviesAsync()).ReturnsAsync(mockMovies);
            _mockMapper.Setup(x => x.Map<List<MovieInfo>>(mockMovies)).Returns(mockMoviesInfo);

            // Act
            var result = await _movieService.GetMoviesAsync();
            // Assert
            Assert.NotNull(result);
            Assert.Empty(result);

        }

        [Fact]
        public async Task GetMoviesAsync_WhenExceptionOccurs_LogsError()
        {
            // Arrange
            _mockMovieRepository
                .Setup(x => x.GetMoviesAsync())
                .ThrowsAsync(new Exception("Error fetching data"));

            // Act
            var result = await _movieService.GetMoviesAsync();

            // Assert
            _mockLogger.Verify(
                x => x.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Error fetching movies")), // Match correct log message
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()
                ),
                Times.Once
            );

            Assert.NotNull(result);
            Assert.Empty(result);


        }
        }
}
