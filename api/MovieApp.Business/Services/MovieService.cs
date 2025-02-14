using AutoMapper;
using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Business.Services;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;

public class MovieService : IMovieService
{
    private readonly IMovieRepository _movieRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<MovieService> _logger;

    public MovieService(IMovieRepository movieRepository, IMapper mapper, ILogger<MovieService> logger)
    {
        _movieRepository = movieRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<MovieRequestDto> CreateMovie(MovieDto movieDto)
    {
        try
        {
            var movie = _mapper.Map<Movie>(movieDto);
            var createdMovie = await _movieRepository.CreateMovieAsync(movie);
            return _mapper.Map<MovieRequestDto>(createdMovie);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while creating movie: {ex.Message}", ex);
            return null;
        }
    }

    public async Task<MovieRequestDto?> ExistingMovie(MovieDto movieDto)
    {
        try
        {
            var movie = _mapper.Map<Movie>(movieDto);
            return _mapper.Map<MovieRequestDto>(await _movieRepository.ExistingMovieAsync(movie));
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while checking for existing movie: {ex.Message}");
            return null;
        }
    }

    public async Task<MovieRequestDto?> GetMovieById(int Id)
    {
        try
        {
            var movie = await _movieRepository.GetMovieByIdAsync(Id);
            if (movie == null)
            {
                _logger.LogWarning($"Movie with Id {Id} not found.");
                return null;
            }
            return _mapper.Map<MovieRequestDto>(movie);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while fetching movie by Id: {ex.Message}");
            return null;
        }
    }

    public async Task<MovieRequestDto?> UpdateMovie(int Id, MovieDto movieDto)
    {
        try
        {
            var existingMovie = await _movieRepository.GetMovieByIdAsync(Id);
            if (existingMovie == null)
            {
                _logger.LogWarning($"Movie with Id {Id} not found for update.");
                return null;
            }

            _mapper.Map(movieDto, existingMovie);
            var updatedMovie = await _movieRepository.UpdateMovieAsync(existingMovie);

            return _mapper.Map<MovieRequestDto>(updatedMovie);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error occurred while updating movie: {ex.Message}");
            return null;
        }
    }
}
