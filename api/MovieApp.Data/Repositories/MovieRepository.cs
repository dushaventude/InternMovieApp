using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieApp.Data.Entities;


namespace MovieApp.Data.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly MovieDbContext _movieDbContext;

        public MovieRepository(MovieDbContext movieDbContext)
        {
            this._movieDbContext = movieDbContext;
        }

        public async Task<Movie?> GetMovieByIdAsync(int id)
        {
            return await _movieDbContext.Movies.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task DeleteMovieAsync(Movie movie)
        {
            _movieDbContext.Movies.Remove(movie);
            await _movieDbContext.SaveChangesAsync();
        }
        
         public async Task<List<Movie>> GetMoviesAsync()
        {
            return await _movieDbContext.Movies.ToListAsync();
        }

        
    }
}

