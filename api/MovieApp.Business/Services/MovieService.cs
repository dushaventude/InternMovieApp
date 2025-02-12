using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MovieApp.Business.DTOs;
using MovieApp.Data.Repositories;

namespace MovieApp.Business.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MovieService(IMovieRepository movieRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
        }
        public async Task<List<MovieInfo>> GetMoviesAsync()
        {
            try
            {
                var movies = await _movieRepository.GetMoviesAsync();
                if (movies.Count > 0)
                {
                    var movieInfo = _mapper.Map<List<MovieInfo>>(movies);
                    return movieInfo;
                }
                else
                {
                    return null;

                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
    }
}
