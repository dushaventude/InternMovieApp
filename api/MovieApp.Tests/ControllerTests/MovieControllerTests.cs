//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using Xunit;
//using MovieApp.Api.Controllers;
//using MovieApp.Business.Services;
//using MovieApp.Shared.Models;
//using Microsoft.AspNetCore.Http;

//namespace MovieApp.Tests.ControllerTests
//{
//    public class MovieControllerTests
//    {
//        private readonly Mock<IMovieService> _mockMovieService;
//        private readonly MovieController _movieController;

//        public MovieControllerTests()
//        {
//            _mockMovieService = new Mock<IMovieService>();
//            _movieController = new MovieController(_mockMovieService.Object);
//        }

//        [Fact]
//        public async Task DeleteMovie_ReturnsBadRequest_WhenIdIsInvalid()
//        {
//            // Act
//            var result = await _movieController.DeleteMovie(0);

//            // Assert: Ensure BadRequest result with message is returned
//            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
//            Assert.NotNull(badRequestResult);
//            var errorResponse = Assert.IsType<ErrorResponse>(badRequestResult.Value);
//            Assert.Equal(StatusCodes.Status400BadRequest, errorResponse.StatusCode);
//            Assert.Equal("Invalid request", errorResponse.Message);
//            Assert.Contains("Invalid movie ID", errorResponse.Errors);
//        }

//        [Fact]
//        public async Task DeleteMovie_ReturnsNoContent_WhenMovieIsDeletedSuccessfully()
//        {
//            // Arrange: Simulate successful deletion
//            _mockMovieService
//                .Setup(service => service.DeleteMovieAsync(It.IsAny<int>()))
//                .ReturnsAsync(true);

//            // Act
//            var result = await _movieController.DeleteMovie(1);

//            // Assert: Ensure NoContent result is returned
//            var noContentResult = Assert.IsType<NoContentResult>(result);
//            Assert.NotNull(noContentResult);
//        }

//        [Fact]
//        public async Task DeleteMovie_ReturnsNotFound_WhenMovieIsNotFound()
//        {
//            // Arrange: Simulate movie not found
//            _mockMovieService
//                .Setup(service => service.DeleteMovieAsync(It.IsAny<int>()))
//                .ReturnsAsync(false);

//            // Act
//            var result = await _movieController.DeleteMovie(1);

//            // Assert: Ensure NotFound result with message is returned
//            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
//            Assert.NotNull(notFoundResult);
//            var errorResponse = Assert.IsType<ErrorResponse>(notFoundResult.Value);
//            Assert.Equal(StatusCodes.Status404NotFound, errorResponse.StatusCode);
//            Assert.Equal("Movie not found", errorResponse.Message);
//            Assert.Contains("Movie with ID 1 not found", errorResponse.Errors);
//        }
//    }
//}