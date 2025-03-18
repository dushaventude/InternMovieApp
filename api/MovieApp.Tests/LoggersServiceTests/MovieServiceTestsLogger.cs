using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using MovieApp.Business.Services;
using MovieApp.Data.Repositories;
using MovieApp.Data.Entities;


namespace MovieApp.Tests.LoggerServiceTests
{
    public class MovieServiceTestsLogger
    {
        private readonly Mock<IMovieRepository> _mockMovieRepository;
        private readonly Mock<ILogger<MovieService>> _mockLogger;
        private readonly MovieService _movieService;

        public MovieServiceTestsLogger()
        {
            _mockMovieRepository = new Mock<IMovieRepository>();
            _mockLogger = new Mock<ILogger<MovieService>>();

            _movieService = new MovieService(
                _mockMovieRepository.Object,
                _mockLogger.Object);
        }

        [Fact]
        public async Task DeleteMovieAsync_LogsWarning_WhenMovieNotFound()
        {
            // Arrange: Simulate movie not found
            _mockMovieRepository
                .Setup(repo => repo.GetMovieByIdAsync(It.IsAny<int>()))
                .ReturnsAsync((Movie)null);

            // Act
            var result = await _movieService.DeleteMovieAsync(1);

            // Assert: Ensure logging was called
            Assert.False(result);
            _mockLogger.Verify(
                logger => logger.Log(
                    LogLevel.Warning,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((state, t) => state.ToString().Contains("Movie with ID 1 not found")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }

        [Fact]
        public async Task DeleteMovieAsync_LogsError_WhenExceptionOccurs()
        {
            // Arrange: Simulate exception in repository
            _mockMovieRepository
                .Setup(repo => repo.GetMovieByIdAsync(It.IsAny<int>()))
                .ThrowsAsync(new Exception("Database error"));

            // Act
            var result = await _movieService.DeleteMovieAsync(1);

            // Assert: Ensure logging was called
            Assert.False(result);
            _mockLogger.Verify(
                logger => logger.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((state, t) => state.ToString().Contains("Error deleting movie with ID 1")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }

        [Fact]
        public async Task DeleteMovieAsync_ReturnsTrue_WhenMovieDeletedSuccessfully()
        {
            // Arrange: Simulate successful deletion
            var movie = new Movie { Id = 1, Title = "Test Movie" };
            _mockMovieRepository
                .Setup(repo => repo.GetMovieByIdAsync(It.IsAny<int>()))
                .ReturnsAsync(movie);

            // Act
            var result = await _movieService.DeleteMovieAsync(1);

            // Assert: Ensure the movie was deleted and the result is true
            Assert.True(result);
            _mockMovieRepository.Verify(repo => repo.DeleteMovieAsync(movie), Times.Once);
        }
    }
}