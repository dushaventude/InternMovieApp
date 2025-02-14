using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using MovieApp.Data.Repositories;
using MovieApp.Data.Entities;
using MovieApp.Data;

namespace MovieApp.Tests.ServiceTests
{
    public class ActorRepositoryTests
    {
        private readonly MovieDbContext _context;
        private readonly ActorRepository _actorRepository;

        public ActorRepositoryTests()
        {
            var options = new DbContextOptionsBuilder<MovieDbContext>()
                .UseInMemoryDatabase(databaseName: "ActorTestDb")
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

            // Call the extracted validation method
            ActorValidationTests.VerifyActorExists(_context, "New Actor", "Male", "New Country");
        }
    }

    public class ActorValidationTests
    {
        private readonly MovieDbContext _context;

        public ActorValidationTests()
        {
            var options = new DbContextOptionsBuilder<MovieDbContext>()
                .UseInMemoryDatabase(databaseName: "ActorValidationTestDb")
                .Options;

            _context = new MovieDbContext(options);

            _context.Actors.Add(new Actor { Name = "Test Actor", Gender = "Female", Country = "Test Country" });
            _context.SaveChanges();
        }

        [Fact]
        public void VerifyActorExists_ActorExists_Passes()
        {
            VerifyActorExists(_context, "Test Actor", "Female", "Test Country");
        }

        [Fact]
        public void VerifyActorExists_ActorDoesNotExist_Fails()
        {
            var exception = Record.Exception(() => VerifyActorExists(_context, "Nonexistent Actor", "Male", "Nowhere"));
            Assert.NotNull(exception);
        }

        public static void VerifyActorExists(MovieDbContext context, string name, string gender, string country)
        {
            var addedActor = context.Actors.FirstOrDefault(a => a.Name == name);
            Assert.NotNull(addedActor);
            Assert.Equal(name, addedActor.Name);
            Assert.Equal(gender, addedActor.Gender);
            Assert.Equal(country, addedActor.Country);
        }
    }
}
