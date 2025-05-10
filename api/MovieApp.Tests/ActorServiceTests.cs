using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
        public async Task GetActorById_WhenActorExists_ReturnsActorInfo()
        {
            //Arrange
            int actorid = 1;
            var mockActor = new Actor { Id = actorid, Name = "shanuka" };
            var mockActorInfo = new ActorInfo { Id = actorid, Name = "shanuka" };

            _mockActorRepository.Setup(x => x.GetActorAsync(actorid)).ReturnsAsync(mockActor);

            _mockMapper.Setup(x => x.Map<ActorInfo>(mockActor)).Returns(mockActorInfo);

            //Act
            var result = await _actorService.GetActorById(actorid);

            //Assert
            Assert.NotNull(result);
            Assert.Equal(mockActorInfo.Id, result.Id);
            Assert.Equal(mockActorInfo.Name, result.Name);

        }

        [Fact]
        public async Task GetActorById_WhenActorDoesNotExists_ReturnsNull()
        {
            //Arrange
            int actorid = 1;
            Actor mockActor = null;
            _mockActorRepository.Setup(x => x.GetActorAsync(actorid)).ReturnsAsync(mockActor);
            //Act
            var result = await _actorService.GetActorById(actorid);
            //Assert
            Assert.Null(result);
        }


        [Fact]
        public async Task GetActorById_WhenExceptionOccurs_LogsError()
        {
            //arrange
            int actorid = 1;
            _mockActorRepository.Setup(x => x.GetActorAsync(actorid)).ThrowsAsync(new Exception("Error fetching actor"));

            //act
            var result = await _actorService.GetActorById(actorid);

            //assert
            //_mockLogger.Verify(x => x.LogError(It.IsAny<string>(), It.IsAny<object[]>()), Times.Once);

            _mockLogger.Verify(
                 x => x.Log(
                 LogLevel.Error,         
                 It.IsAny<EventId>(),       
                 It.Is<It.IsAnyType>((v, t) => v.ToString().Contains("Error fetching actor")),
                 It.IsAny<Exception>(),    
                 It.IsAny<Func<It.IsAnyType, Exception, string>>() 
    ),
    Times.Once
);

        }

    }


    }
