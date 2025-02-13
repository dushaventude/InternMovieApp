using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public class MovieRepository:IMovieRepository
    {
        private readonly MovieDbContext _context;

        public MovieRepository(MovieDbContext context)
        {
            _context = context;
        }
        public async Task<Movie> CreateMovieAsync(Movie movieModel)
        {
            _context.Movies.Add(movieModel);
            await _context.SaveChangesAsync();
            return movieModel;
        }

        public async Task<Movie?> UpdateMovieAsync(int Id, Movie movieModel)
        {
            var existingMovie = await _context.Movies.FindAsync(Id);

            if (existingMovie == null)
            {
                return null;
            }
            existingMovie.Title = movieModel.Title;
            existingMovie.Description = movieModel.Description;
            existingMovie.Photo = movieModel.Photo;
            existingMovie.IsFeatured = movieModel.IsFeatured;
            existingMovie.ReleaseDate = movieModel.ReleaseDate;

            await _context.SaveChangesAsync();
            return existingMovie;
        }
    }
}
