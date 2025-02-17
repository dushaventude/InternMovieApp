using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Data.Entities;
using MovieApp.Business.DTOs;


namespace MovieApp.Business.Services
{
    public interface IMovieService
    {

        Task<CreateMovieDto> CreateMovie(CreateMovieDto movieDto);
        Task<UpdateMovieDto?> UpdateMovie(int Id,UpdateMovieDto movieDto);

        Task<bool> DeleteMovieAsync(int id);
        Task<List<MovieInfo>> GetMoviesAsync();
        Task<List<MovieInfo>> SearchMoviesAsync(MovieSearchFilter filter);

    }
}
