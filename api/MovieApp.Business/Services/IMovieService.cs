using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Data.Entities;


namespace MovieApp.Business.Services
{
    public interface IMovieService
    {
        Task<MovieRequestDto?> GetMovieById(int id);
        Task<MovieRequestDto> CreateMovie(MovieDto movieDto);
        Task<MovieRequestDto?> UpdateMovie(int Id,MovieDto movieDto);
        Task<MovieRequestDto?> ExistingMovie(MovieDto movieDto);
    }
}
