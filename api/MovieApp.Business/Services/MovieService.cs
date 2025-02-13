using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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

        public MovieService(IMovieRepository movieRepository, IMapper mapper,ILogger<MovieService> @object)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
            _logger = @object;
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
    }
}
