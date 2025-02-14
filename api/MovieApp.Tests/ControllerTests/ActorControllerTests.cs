//using System;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Moq;
//using Xunit;
//using MovieApp.Api.Controllers;
//using MovieApp.Business.DTOs;
//using MovieApp.Business.Services;
//using MovieApp.Shared.Models;

//namespace MovieApp.Tests.ControllerTests
//{
//    public class ActorControllerTests
//    {
//        private readonly Mock<IActorService> _mockActorService;
//        private readonly ActorController _actorController;

//        public ActorControllerTests()
//        {
//            _mockActorService = new Mock<IActorService>();
//            _actorController = new ActorController(_mockActorService.Object);
//        }

//        [Fact]
//        public async Task GetActorById_ReturnsNotFound_WhenActorIsNull()
//        {
//            // Arrange: Simulate actor not found
//            _mockActorService
//                .Setup(service => service.GetActorById(It.IsAny<int>()))
//                .ReturnsAsync((ActorInfo)null);

//            // Act
//            var result = await _actorController.GetActorById(1);

//            // Assert: Ensure NotFound result is returned
//            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
//            Assert.NotNull(notFoundResult);
//            var errorResponse = Assert.IsType<ErrorResponse>(notFoundResult.Value);
//            Assert.Equal(StatusCodes.Status404NotFound, errorResponse.StatusCode);
//            Assert.Equal("Actor not found", errorResponse.Message);
//            Assert.Contains("Actor with ID 1 not found", errorResponse.Errors);
//        }

//        [Fact]
//        public async Task GetActorById_ReturnsOk_WhenActorIsFound()
//        {
//            // Arrange: Simulate actor found
//            var actor = new ActorInfo { Id = 1, Name = "Test Actor", Gender = "Male", Country = "Test Country" };
//            _mockActorService
//                .Setup(service => service.GetActorById(It.IsAny<int>()))
//                .ReturnsAsync(actor);

//            // Act
//            var result = await _actorController.GetActorById(1);

//            // Assert: Ensure Ok result with actor data is returned
//            var okResult = Assert.IsType<OkObjectResult>(result.Result);
//            Assert.NotNull(okResult);
//            var actorResult = Assert.IsType<ActorInfo>(okResult.Value);
//            Assert.Equal(1, actorResult.Id);
//            Assert.Equal("Test Actor", actorResult.Name);
//            Assert.Equal("Male", actorResult.Gender);
//            Assert.Equal("Test Country", actorResult.Country);
//        }

//        [Fact]
//        public async Task AddActor_ReturnsBadRequest_WhenCreateActorInfoIsNull()
//        {
//            // Act
//            var result = await _actorController.AddActor(null);

//            // Assert: Ensure BadRequest result with message is returned
//            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
//            Assert.NotNull(badRequestResult);
//            var errorResponse = Assert.IsType<ErrorResponse>(badRequestResult.Value);
//            Assert.Equal(StatusCodes.Status400BadRequest, errorResponse.StatusCode);
//            Assert.Equal("Invalid request", errorResponse.Message);
//            Assert.Contains("Actor data is required.", errorResponse.Errors);
//        }

//        [Fact]
//        public async Task AddActor_ReturnsInternalServerError_WhenAddActorFails()
//        {
//            // Arrange: Simulate failure in adding actor
//            var createActorInfo = new CreateActorInfo { Name = "New Actor", Gender = "Male", Country = "New Country" };
//            _mockActorService
//                .Setup(service => service.AddActorAsync(It.IsAny<CreateActorInfo>()))
//                .ReturnsAsync((ActorInfo)null);

//            // Act
//            var result = await _actorController.AddActor(createActorInfo);

//            // Assert: Ensure BadRequest result with internal server error message is returned
//            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
//            Assert.NotNull(badRequestResult);
//            var errorResponse = Assert.IsType<ErrorResponse>(badRequestResult.Value);
//            Assert.Equal(StatusCodes.Status500InternalServerError, errorResponse.StatusCode);
//            Assert.Equal("Failed to add actor", errorResponse.Message);
//            Assert.Contains("Failed to add actor.Internal Server Error", errorResponse.Errors);
//        }

//        [Fact]
//        public async Task AddActor_ReturnsCreatedAtAction_WhenActorIsAddedSuccessfully()
//        {
//            // Arrange: Simulate successful addition of actor
//            var createActorInfo = new CreateActorInfo { Name = "New Actor", Gender = "Male", Country = "New Country" };
//            var addedActor = new ActorInfo { Id = 1, Name = "New Actor", Gender = "Male", Country = "New Country" };
//            _mockActorService
//                .Setup(service => service.AddActorAsync(It.IsAny<CreateActorInfo>()))
//                .ReturnsAsync(addedActor);

//            // Act
//            var result = await _actorController.AddActor(createActorInfo);

//            // Assert: Ensure CreatedAtAction result with actor data is returned
//            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
//            Assert.NotNull(createdAtActionResult);
//            Assert.Equal(nameof(ActorController.GetActorById), createdAtActionResult.ActionName);
//            Assert.Equal(1, createdAtActionResult.RouteValues["id"]);
//            var actorResult = Assert.IsType<ActorInfo>(createdAtActionResult.Value);
//            Assert.Equal(1, actorResult.Id);
//            Assert.Equal("New Actor", actorResult.Name);
//            Assert.Equal("Male", actorResult.Gender);
//            Assert.Equal("New Country", actorResult.Country);
//        }
//    }
//}