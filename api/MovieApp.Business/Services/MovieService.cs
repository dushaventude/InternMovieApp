using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Data.Entities;

using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs;
using MovieApp.Data.Repositories;

namespace MovieApp.Business.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;

        private readonly IMapper _mapper;
        private readonly ILogger<MovieService> _logger;

        public MovieService(IMovieRepository movieRepository, IMapper mapper,ILogger<MovieService> logger )
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
        
        public async Task<List<MovieInfo>> GetMoviesAsync()
        {
            try
            {
                var movies = await _movieRepository.GetMoviesAsync();
                if(movies == null||movies.Count==0)
                {
                    return new List<MovieInfo>();
                }else
                {
                    var movieInfo = _mapper.Map<List<MovieInfo>>(movies);
                    return movieInfo;
                }
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching movies: {ex.Message}");
                return new List<MovieInfo>();
            }
            
        }
        public async Task<List<MovieInfo>> SearchMoviesAsync(MovieSearchFilter filter)
        {
            try
            {
                var movies = await _movieRepository.GetMoviesAsync();
                var filteredMovies = movies.AsQueryable();

                // Search if title contains the filter title
                if (!string.IsNullOrWhiteSpace(filter.Title))
                {
                    filteredMovies = filteredMovies.Where(m => m.Title.Contains(filter.Title, StringComparison.OrdinalIgnoreCase));
                }

                // Search from release date from and to
                if (filter.ReleaseDateFrom.HasValue)
                {
                    filteredMovies = filteredMovies.Where(m => m.ReleaseDate >= filter.ReleaseDateFrom.Value);
                }

            
                if (filter.ReleaseDateTo.HasValue)
                {
                    filteredMovies = filteredMovies.Where(m => m.ReleaseDate <= filter.ReleaseDateTo.Value);
                }

                // Search if movie is featured
                if (filter.IsFeatured.HasValue)
                {
                    filteredMovies = filteredMovies.Where(m => m.IsFeatured == filter.IsFeatured.Value);
                }

                var movieInfo = _mapper.Map<List<MovieInfo>>(filteredMovies.ToList());
                return movieInfo;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error searching movies: {ex.Message}");
                return new List<MovieInfo>();
            }
        }
    }

}

