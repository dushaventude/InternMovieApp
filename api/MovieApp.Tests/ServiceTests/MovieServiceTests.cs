//using AutoMapper;
//using Microsoft.Extensions.Logging;
//using Moq;
//using MovieApp.Business.Services;
//using MovieApp.Data.Entities;
//using MovieApp.Data.Repositories;

//public class MovieServiceTests
//{
//    private readonly Mock<IMovieRepository> _mockMovieRepository;
//    private readonly Mock<ILogger<MovieService>> _mockLogger;
//    private readonly MovieService _movieService;
//    private readonly IMapper _mockMapper;

//    public MovieServiceTests()
//    {
//        _mockMovieRepository = new Mock<IMovieRepository>();
//        _mockLogger = new Mock<ILogger<MovieService>>();
//        _mockMapper = new Mock<IMapper>();
//        _movieService = new MovieService(_mockMovieRepository.Object, _mockLogger.Object, _mockMapper.Object);
//    }

//    [Fact]
//    public async Task DeleteMovieById_WhenMovieExists_ReturnsTrue()
//    {
//        // Arrange
//        int movieId = 1;
//        var mockMovie = new Movie { Id = movieId, Title = "Test Movie" };
//        _mockMovieRepository.Setup(x => x.GetMovieByIdAsync(movieId)).ReturnsAsync(mockMovie);
//        _mockMovieRepository.Setup(x => x.DeleteMovieAsync(mockMovie)).Returns(Task.CompletedTask);

//        // Act
//        var result = await _movieService.DeleteMovieAsync(movieId);

//        // Assert
//        Assert.True(result);
//        _mockMovieRepository.Verify(x => x.DeleteMovieAsync(mockMovie), Times.Once);
//    }

//    [Fact]
//    public async Task DeleteMovieById_WhenMovieDoesNotExist_ReturnsFalse()
//    {
//        // Arrange
//        int movieId = 1;
//        _mockMovieRepository.Setup(x => x.GetMovieByIdAsync(movieId)).ReturnsAsync((Movie)null);

//        // Act
//        var result = await _movieService.DeleteMovieAsync(movieId);

//        // Assert
//        Assert.False(result);
//        _mockMovieRepository.Verify(x => x.DeleteMovieAsync(It.IsAny<Movie>()), Times.Never);
//    }
//}