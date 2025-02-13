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
        Task<Movie?> GetMovieByIdAsync(int Id); 
        Task<Movie> CreateMovieAsync(Movie movieModel);
        Task<Movie?> UpdateMovieAsync(int Id,Movie movieModel);
    }
}
