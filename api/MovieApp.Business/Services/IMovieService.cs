using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Business.DTOs;

namespace MovieApp.Business.Services
{
    public interface IMovieService
    {
        Task<List<MovieInfo>> GetMoviesAsync();
       
    }
}
