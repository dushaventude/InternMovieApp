using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Data.Entities;

using Microsoft.Extensions.Logging;

using MovieApp.Data.Repositories;

namespace MovieApp.Business.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<MovieService> _logger;


        public MovieService(IMovieRepository movieRepository,IMapper mapper,ILogger<MovieService> logger)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<CreateMovieDto> CreateMovie(CreateMovieDto movieModel)
        {
            var movie = _mapper.Map<Movie>(movieModel);
            var createdMovie = await  _movieRepository.CreateMovieAsync(movie);

            return _mapper.Map<CreateMovieDto>(createdMovie);
        }

        public async Task<UpdateMovieDto?> UpdateMovie(int Id,UpdateMovieDto movieModel)
        {
            var movie = _mapper.Map<Movie>(movieModel);
            var updatedMovie = await _movieRepository.UpdateMovieAsync(Id,movie);

            if (updatedMovie == null) return null;
            
            return _mapper.Map<UpdateMovieDto>(updatedMovie);
        }

        public async Task<bool> DeleteMovieAsync(int id)
        {
            try
            {
                var movie = await _movieRepository.GetMovieByIdAsync(id);
                if (movie == null)
                {
                    _logger.LogWarning("Movie with ID {MovieId} not found", id);
                    return false;
                }

                await _movieRepository.DeleteMovieAsync(movie);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting movie with ID {MovieId}", id);
                return false;
            }
        }
    }
}

