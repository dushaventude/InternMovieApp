using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Moq;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;
using Xunit;

namespace MovieApp.Tests
{
    public class ActorServiceTests
    {
        private readonly ActorService _actorService;
        private readonly Mock<IActorRepository> _mockActorRepository;
        private readonly Mock<ILogger<ActorService>> _mockLogger;
        private readonly Mock<IMapper> _mockMapper;

        public ActorServiceTests()
        {
            _mockActorRepository = new Mock<IActorRepository>();
            _mockLogger = new Mock<ILogger<ActorService>>();
            _mockMapper = new Mock<IMapper>();
            _actorService = new ActorService(_mockActorRepository.Object, _mockMapper.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task DeleteActorById_WhenActorExists_ReturnsTrue()
        {
            // Arrange
            int actorId = 1;
            var mockActor = new Actor { Id = actorId, Name = "Sri" };
            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync(mockActor);
            _mockActorRepository.Setup(x => x.DeleteAsync(mockActor)).ReturnsAsync(true);  

            // Act
            var result = await _actorService.DeleteActorById(actorId);

            // Assert
            Assert.True(result);
            _mockActorRepository.Verify(x => x.DeleteAsync(mockActor), Times.Once);
        }

        [Fact]
        public async Task DeleteActorById_WhenActorDoesNotExist_ReturnsFalse()
        {
            // Arrange
            int actorId = 1;
            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync((Actor)null);

            // Act
            var result = await _actorService.DeleteActorById(actorId);

            // Assert
            Assert.False(result);
            _mockActorRepository.Verify(x => x.DeleteAsync(It.IsAny<Actor>()), Times.Never);
        }

        [Fact]
        public async Task UpdateActorAsync_WhenUpdateSucceeds_ReturnsActorInfo()
        {
            // Arrange
            var actor = new Actor
            {
                Id = 1,
                Name = "Sri",
                Gender = "Male",
                Country = "Sri Lanka"
            };

            var updatedActorInfo = new ActorInfo
            {
                Id = 1,
                Name = "Billie Ellish",
                Gender = "Female",
                Country = "USA"  
            };

            _mockActorRepository.Setup(x => x.UpdateActorAsync(actor)).ReturnsAsync(actor);
            _mockMapper.Setup(x => x.Map<ActorInfo>(actor)).Returns(updatedActorInfo);

            // Act
            var result = await _actorService.UpdateActorAsync(actor);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(updatedActorInfo.Id, result.Id);
            Assert.Equal(updatedActorInfo.Name, result.Name);
            Assert.Equal(updatedActorInfo.Gender, result.Gender);
            Assert.Equal(updatedActorInfo.Country, result.Country);
        }

        [Fact]
        public async Task UpdateActorAsync_WhenUpdateFails_ThrowsException()
        {
            // Arrange
            var actor = new Actor
            {
                Id = 1,
                Name = "Harish",
                Gender = "Male",
                Country = "Sri Lanka"
            };

            _mockActorRepository.Setup(x => x.UpdateActorAsync(actor))
                .ThrowsAsync(new Exception("Update failed"));

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => _actorService.UpdateActorAsync(actor));
        }

        [Fact]
        public async Task UpdateActorAsync_WhenActorNotFound_ReturnsNull()
        {
            // Arrange
            var actor = new Actor
            {
                Id = 1,
                Name = "Harish",
                Gender = "Male",
                Country = "Sri Lanka"
            };

            _mockActorRepository.Setup(x => x.UpdateActorAsync(actor)).ReturnsAsync((Actor)null);

            // Act
            var result = await _actorService.UpdateActorAsync(actor);

            // Assert
            Assert.Null(result);
        }
    }
}