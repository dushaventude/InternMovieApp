using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;

namespace MovieApp.Business.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;

        public MovieService(IMovieRepository movieRepository,IMapper mapper)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
        }
        public async Task<MovieRequestDto> CreateMovie(MovieDto movieDto)
        {
            var movie = _mapper.Map<Movie>(movieDto);
            var createdMovie = await  _movieRepository.CreateMovieAsync(movie);

            return _mapper.Map<MovieRequestDto>(createdMovie);
        }

        public async Task<MovieRequestDto?> GetMovieById(int Id)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(Id);
            return _mapper.Map<MovieRequestDto>(movie);
        }

        public async Task<MovieRequestDto?> UpdateMovie(int Id, MovieDto movieDto)
        {
            var existingMovie = await _movieRepository.GetMovieByIdAsync(Id);
            if (existingMovie == null) return null;

            _mapper.Map(movieDto, existingMovie);
            
            var updatedMovie = await _movieRepository.UpdateMovieAsync(existingMovie);

            return _mapper.Map<MovieRequestDto>(updatedMovie);
        }
    }
}
