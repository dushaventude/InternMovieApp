using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MovieApp.Data.Repositories;

namespace MovieApp.Business.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly ILogger<MovieService> _logger;

        public MovieService(IMovieRepository movieRepository, ILogger<MovieService> logger)
        {
            _movieRepository = movieRepository;
            _logger = logger;
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