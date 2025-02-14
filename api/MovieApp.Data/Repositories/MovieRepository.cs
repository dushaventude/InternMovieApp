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

        public async Task<Movie?> GetMovieByIdAsync(int Id)
        {
            return await _context.Movies.FindAsync(Id);
        }

        public async Task<Movie?> UpdateMovieAsync(Movie movie)
        {
            _context.Movies.Update(movie);
            await _context.SaveChangesAsync();
            return movie;
        }
    }
}
