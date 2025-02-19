using AutoMapper;
using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Business.Services;
using MovieApp.Data.Entities;

using Microsoft.Extensions.Logging;
using MovieApp.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MovieApp.Business.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IActorRepository _actorRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<MovieService> _logger;

    public MovieService(
        IMovieRepository movieRepository,
        IActorRepository actorRepository, 
        IReviewRepository reviewRepository,
        IMapper mapper, 
        ILogger<MovieService> logger)
    {
        _movieRepository = movieRepository;
        _actorRepository = actorRepository;
        _reviewRepository = reviewRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<MovieRequestDto> CreateMovie(MovieDto movieDto)
    {
        try
        {
            var movie = _mapper.Map<Movie>(movieDto);
            if (movieDto.ActorIds != null && movieDto.ActorIds.Count > 0)
            {
                foreach (var actorId in movieDto.ActorIds)
                {
                    var actor = await _actorRepository.GetActorAsync(actorId);
                    if (actor != null)
                    {
                        movie.MovieActors.Add(new MovieActor
                        {
                            Movie = movie,
                            Actor = actor
                        });
                    }
                }
            }
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
            var movieDto = _mapper.Map<MovieRequestDto>(movie);

            movieDto.Actors = movie.MovieActors.Select(ma => new ActorDto
            {
                Id = ma.Actor.Id,
                Name = ma.Actor.Name
            }).ToList();
            var reviews = await _reviewRepository.GetReviewsByMovieIdAsync(Id);
            movieDto.AverageRating = (reviews != null && reviews.Any())
                ? Math.Round(reviews.Average(r => r.Rate), 1)
                : null;

            return movieDto;
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
                if (movieDto.ActorIds != null)
                {
                    // Fetch all existing MovieActor relationships for this movie
                    var existingMovieActors = existingMovie.MovieActors.ToList();

                    // Remove actors that are not in the updated list
                    foreach (var movieActor in existingMovieActors)
                    {
                        if (!movieDto.ActorIds.Contains(movieActor.ActorId))
                        {
                            existingMovie.MovieActors.Remove(movieActor);
                        }
                    }

                    // Add new actors that are not already in the list
                    foreach (var actorId in movieDto.ActorIds)
                    {
                        if (!existingMovieActors.Any(ma => ma.ActorId == actorId))
                        {
                            var actor = await _actorRepository.GetActorAsync(actorId);
                            if (actor != null)
                            {
                                existingMovie.MovieActors.Add(new MovieActor
                                {
                                    MovieId = existingMovie.Id,
                                    ActorId = actor.Id
                                });
                            }
                        }
                    }
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


        public async Task<GetAllMoviesDto> GetMoviesAsync(MovieSearchFilter filter)
        {
            try
            {
                var moviesQuery = await _movieRepository.GetMoviesAsync();

                if (!string.IsNullOrEmpty(filter.Query))
                {
                    moviesQuery = moviesQuery.Where(m => m.Title.Contains(filter.Query));
                }

                var TotalMovies = await moviesQuery.CountAsync();

                var totalPages = (int)Math.Ceiling((double)TotalMovies / filter.PageSize);

                if (filter.PageNumber > totalPages || TotalMovies == 0)
                {
                    return CreateGetAllActorsDto(filter.PageNumber, filter.PageSize, TotalMovies, null);
                }
                var movies = await moviesQuery.Skip((filter.PageNumber - 1) * filter.PageSize).Take(filter.PageSize).ToListAsync();

                return CreateGetAllActorsDto(filter.PageNumber, filter.PageSize, TotalMovies, movies);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching movies: {ex.Message}");
                return CreateGetAllActorsDto(filter.PageNumber, filter.PageSize, 0, null);
            }
        }

        private GetAllMoviesDto CreateGetAllActorsDto(int pageNumber, int pageSize, int totalMovies, List<Movie>? movies)
        {
            return new GetAllMoviesDto
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalMovies,
                Response = movies != null && movies.Any()
                    ? _mapper.Map<List<MovieInfo>>(movies)
                    : new List<MovieInfo>()
            };
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
