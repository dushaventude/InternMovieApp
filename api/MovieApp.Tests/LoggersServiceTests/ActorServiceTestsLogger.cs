using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;
using MovieApp.Business.Services;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;


namespace MovieApp.Tests.LoggerServiceTests
{

    public class ActorServiceTestsLogger
    {
        private readonly Mock<IActorRepository> _mockActorRepository;
        private readonly Mock<ILogger<ActorService>> _mockLogger;
        private readonly Mock<IMapper> _mockMapper;
        private readonly ActorService _actorService;

        public ActorServiceTestsLogger()
        {
            _mockActorRepository = new Mock<IActorRepository>();
            _mockLogger = new Mock<ILogger<ActorService>>();
            _mockMapper = new Mock<IMapper>();

            _actorService = new ActorService(
                _mockActorRepository.Object,
                _mockLogger.Object,
                _mockMapper.Object);
        }

        [Fact]
        public async Task GetActorById_LogsError_WhenExceptionOccurs()
        {
            // Arrange: Simulate exception in repository
            _mockActorRepository
                .Setup(repo => repo.GetActorAsync(It.IsAny<int>()))
                .ThrowsAsync(new Exception("Database error"));

            // Act
            var result = await _actorService.GetActorById(1);

            // Assert: Ensure logging was called
            Assert.Null(result);
            _mockLogger.Verify(
                logger => logger.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((state, t) => state.ToString().Contains("Error occurred while fetching actor with ID: 1")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }

        [Fact]
        public async Task AddActorAsync_LogsError_WhenExceptionOccurs()
        {
            // Arrange: Simulate exception in repository
            var createActorInfo = new CreateActorInfo { Name = "New Actor", Gender = "Male", Country = "Country X" };

            _mockMapper.Setup(mapper => mapper.Map<Actor>(It.IsAny<CreateActorInfo>()))
                       .Throws(new Exception("Mapping error"));

            // Act
            var result = await _actorService.AddActorAsync(createActorInfo);

            // Assert: Ensure logging was called
            Assert.Null(result);
            _mockLogger.Verify(
                logger => logger.Log(
                    LogLevel.Error,
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((state, t) => state.ToString().Contains("Error occurred while adding actor")),
                    It.IsAny<Exception>(),
                    It.IsAny<Func<It.IsAnyType, Exception, string>>()),
                Times.Once);
        }
    }
}