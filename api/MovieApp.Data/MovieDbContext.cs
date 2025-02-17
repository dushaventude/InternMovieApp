using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieApp.Data.Entities;


namespace MovieApp.Data
{
    public class MovieDbContext: DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options) { }

        
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieActor> MovieActors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieActor>(x => x.HasKey(p=> new {p.MovieId,p.ActorId}));

            modelBuilder.Entity<MovieActor>()
                .HasOne(m => m.Movie)
                .WithMany(m => m.MovieActors)
                .HasForeignKey(m => m.MovieId);

            modelBuilder.Entity<MovieActor>()
                .HasOne(m => m.Actor)
                .WithMany(m => m.MovieActors)
                .HasForeignKey(m => m.ActorId);

            modelBuilder.Entity<Movie>()
                .HasIndex(m => m.Title)
                .IsUnique();
            base.OnModelCreating(modelBuilder);
        }
    }
}
