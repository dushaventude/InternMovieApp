using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using Xunit;
using MovieApp.Data.Repositories;
using MovieApp.Data.Entities;
using MovieApp.Data;

namespace MovieApp.Tests
{
    public class ActorRepositoryTests
    {
        private readonly MovieDbContext _context;
        private readonly ActorRepository _actorRepository;

        public ActorRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<MovieDbContext>()
                .UseInMemoryDatabase(databaseName: "AddActorTest")
                .Options;

            _context = new MovieDbContext(options);
            _actorRepository = new ActorRepository(_context);

            _context.Actors.AddRange(
                new Actor { Id = 1, Name = "Actor 1", Gender = "Male", Country = "Country 1" },
                new Actor { Id = 2, Name = "Actor 2", Gender = "Female", Country = "Country 2" }
            );
            _context.SaveChanges();
        }

        [Fact]
        public async Task AddActorAsync_AddsActorToDatabase()
        {
            var newActor = new Actor { Name = "New Actor", Gender = "Male", Country = "New Country" };

            
            var result = await _actorRepository.AddActorAsync(newActor);

            Assert.NotNull(result);
            Assert.Equal("New Actor", result.Name);
            Assert.Equal("Male", result.Gender);
            Assert.Equal("New Country", result.Country);

         
            var addedActor = _context.Actors.FirstOrDefault(a => a.Name == "New Actor");
            Assert.NotNull(addedActor);
            Assert.Equal("New Actor", addedActor.Name);
            Assert.Equal("Male", addedActor.Gender);
            Assert.Equal("New Country", addedActor.Country);
        }
    }
}