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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .HasIndex(m => m.Title)
                .IsUnique();
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Movie> Movies { get; set; }
    }
}
