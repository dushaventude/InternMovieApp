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
        Task<bool> DeleteMovieAsync(int id);
        Task<GetAllMoviesDto> GetMoviesAsync(MovieSearchFilter filter);
        //Task<List<MovieInfo>> SearchMoviesAsync(MovieSearchFilter filter);

        Task<MovieRequestDto?> GetMovieById(int id);
        Task<MovieRequestDto> CreateMovie(MovieDto movieDto);
        Task<MovieRequestDto?> UpdateMovie(int Id, MovieDto movieDto);
        Task<MovieRequestDto?> ExistingMovie(MovieDto movieDto);
    }
}
