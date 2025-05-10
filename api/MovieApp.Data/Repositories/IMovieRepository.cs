using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public interface IMovieRepository
    {
        Task<Movie> CreateMovieAsync(Movie movieModel);
        Task<Movie?> UpdateMovieAsync(Movie movie);

        Task DeleteMovieAsync(Movie movie);
        Task<Movie?> GetMovieByIdAsync(int id);
        Task<List<Movie>> GetMoviesAsync();
        Task<Movie?> ExistingMovieAsync(Movie movie);
    }
}
