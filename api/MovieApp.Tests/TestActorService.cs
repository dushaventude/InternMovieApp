//using System;
//using System.Threading.Tasks;
//using AutoMapper;
//using Microsoft.Extensions.Logging;
//using Moq;
//using MovieApp.Business.DTOs;
//using MovieApp.Business.Services;
//using MovieApp.Data.Entities;
//using MovieApp.Data.Repositories;
//using Xunit;

//namespace MovieApp.Tests
//{
//    public class TestActorService
//    {
//        private readonly ActorService _actorService;
//        private readonly Mock<IActorRepository> _mockActorRepository;
//        private readonly Mock<ILogger<ActorService>> _mockLogger;
//        private readonly Mock<IMapper> _mockMapper;

//        public TestActorService()
//        {
//            _mockActorRepository = new Mock<IActorRepository>();
//            _mockLogger = new Mock<ILogger<ActorService>>();
//            _mockMapper = new Mock<IMapper>();
//            _actorService = new ActorService(_mockActorRepository.Object, _mockMapper.Object, _mockLogger.Object);
//        }

//        [Fact]
//        public async Task DeleteActorById_WhenActorExists_ReturnsTrue()
//        {
//            // Arrange
//            int actorId = 1;
//            var mockActor = new Actor { Id = actorId, Name = "Sri" };
//            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync(mockActor);
//            _mockActorRepository.Setup(x => x.DeleteActorAsync(mockActor)).ReturnsAsync(true);  

//            // Act
//            var result = await _actorService.DeleteActorById(actorId);

//            // Assert
//            Assert.True(result);
//            _mockActorRepository.Verify(x => x.DeleteActorAsync(mockActor), Times.Once);
//        }

//        [Fact]
//        public async Task DeleteActorById_WhenActorDoesNotExist_ReturnsFalse()
//        {
//            // Arrange
//            int actorId = 1;
//            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync((Actor)null);

//            // Act
//            var result = await _actorService.DeleteActorById(actorId);

//            // Assert
//            Assert.False(result);
//            _mockActorRepository.Verify(x => x.DeleteActorAsync(It.IsAny<Actor>()), Times.Never);
//        }

//        [Fact]
//        public async Task UpdateActorById_WhenActorExists_ReturnsUpdatedActorInfo()
//        {
//            // Arrange
//            int actorId = 1;
//            var actorUpdateInfo = new ActorUpdateInfo { Name = "Sri", Gender = "Male", Country = "USA" };
//            var existingActor = new Actor { Id = actorId, Name = "Trisha", Gender = "Female", Country = "UK" };
//            var updatedActor = new Actor { Id = actorId, Name = "Sri", Gender = "Male", Country = "USA" };
//            var expectedActorInfo = new ActorInfo { Id = actorId, Name = "Sri", Gender = "Male", Country = "USA" };

//            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync(existingActor);
//            _mockMapper.Setup(m => m.Map(actorUpdateInfo, existingActor)).Callback<ActorUpdateInfo, Actor>((src, dest) =>
//            {
//                dest.Name = src.Name;
//                dest.Gender = src.Gender;
//                dest.Country = src.Country;
//            });

//            _mockActorRepository.Setup(x => x.UpdateActorAsync(existingActor)).ReturnsAsync(updatedActor);
//            _mockMapper.Setup(m => m.Map<ActorInfo>(updatedActor)).Returns(expectedActorInfo);

//            // Act
//            var result = await _actorService.UpdateActorById(actorId, actorUpdateInfo);

//            // Assert
//            Assert.NotNull(result);
//            Assert.Equal(expectedActorInfo.Name, result.Name);
//            Assert.Equal(expectedActorInfo.Gender, result.Gender);
//            Assert.Equal(expectedActorInfo.Country, result.Country);

//            _mockActorRepository.Verify(x => x.GetActorAsync(actorId), Times.Once);
//            _mockActorRepository.Verify(x => x.UpdateActorAsync(existingActor), Times.Once);
//            _mockMapper.Verify(m => m.Map(actorUpdateInfo, existingActor), Times.Once);
//            _mockMapper.Verify(m => m.Map<ActorInfo>(updatedActor), Times.Once);
//        }

//        [Fact]
//        public async Task UpdateActorById_WhenActorDoesNotExist_ReturnsNull()
//        {
//            // Arrange
//            int actorId = 1;
//            var actorUpdateInfo = new ActorUpdateInfo { Name = "Sri", Gender = "Male", Country = "USA" };

//            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync((Actor)null);

//            // Act
//            var result = await _actorService.UpdateActorById(actorId, actorUpdateInfo);

//            // Assert
//            Assert.Null(result);

//            _mockActorRepository.Verify(x => x.GetActorAsync(actorId), Times.Once);

            
//            _mockActorRepository.Verify(x => x.UpdateActorAsync(It.IsAny<Actor>()), Times.Never);
//        }

//        [Fact]
//        public async Task UpdateActorById_WhenExceptionOccurs_LogsErrorAndReturnsNull()
//        {
//            // Arrange
//            int actorId = 1;
//            var actorUpdateInfo = new ActorUpdateInfo { Name = "Sri", Gender = "Male", Country = "USA" };
//            var existingActor = new Actor { Id = actorId, Name = "Trisha", Gender = "Female", Country = "UK" };

//            _mockActorRepository.Setup(x => x.GetActorAsync(actorId)).ReturnsAsync(existingActor);

//            // Simulate exception in AutoMapper
//            _mockMapper.Setup(m => m.Map(actorUpdateInfo, existingActor)).Throws(new Exception("Mapping error"));

//            // Act
//            var result = await _actorService.UpdateActorById(actorId, actorUpdateInfo);

//            // Assert
//            Assert.Null(result);

//            _mockActorRepository.Verify(x => x.GetActorAsync(actorId), Times.Once);
//            _mockActorRepository.Verify(x => x.UpdateActorAsync(It.IsAny<Actor>()), Times.Never);
//            _mockMapper.Verify(m => m.Map(actorUpdateInfo, existingActor), Times.Once);

            
//            _mockLogger.Verify(
//                x => x.Log(
//                    It.Is<LogLevel>(l => l == LogLevel.Error),  // Check LogLevel
//                    It.IsAny<EventId>(),
//                    It.Is<It.IsAnyType>((state, t) => state.ToString().Contains($"Error Updating actor with ID {actorId}: Mapping error")), // Check message
//                    It.IsAny<Exception>(),
//                    It.IsAny<Func<It.IsAnyType, Exception, string>>()
//                ),
//                Times.Once
//            );
//        }


//    }

//}