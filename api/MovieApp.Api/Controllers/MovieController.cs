using Microsoft.AspNetCore.Authorization;
using MovieApp.Business.DTOs.MovieDtos;
using MovieApp.Business.Services;
using MovieApp.Business.Utilities;
using MovieApp.Shared.Models;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;

namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {

        private readonly OmdbService _omdbService;
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService, OmdbService omdbService)
        {
            _movieService = movieService;
            _omdbService = omdbService;
        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetMovieById(int Id)
        {
            var movie = await _movieService.GetMovieById(Id);

            if (movie == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status404NotFound,
                    "Movie Not Found",
                    $"Movie of {Id} Could not be Found");

                return NotFound(errorResponse);
            }
            return Ok(movie);
        }
        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] MovieDto movieDto)
        {
            if (movieDto == null || movieDto.ActorIds.Count == 0 || movieDto.ActorIds.Contains(0))
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status400BadRequest,

                    "Movie Create Details Required",
                    $"Movie and Actor is required to create");

                return BadRequest(errorResponse);
            }

            if (await _movieService.ExistingMovie(movieDto) != null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "Movie Create Failed",
                    $"Movie with the same title is found in database");
                return BadRequest(errorResponse);
            }

            var createdMovie = await _movieService.CreateMovie(movieDto);

            return CreatedAtAction(nameof(GetMovieById), new { Id = createdMovie.Id }, createdMovie);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateMovie(int Id, [FromBody] MovieDto movieDto)
        {
            var updatedMovie = await _movieService.UpdateMovie(Id, movieDto);
            if (updatedMovie == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status404NotFound,

                    "Movie Not Found",
                    $"Movie of {Id} Could not be Found");

                return NotFound(errorResponse);

            }
            return Ok(updatedMovie);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            if (id <= 0)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "Invalid request",
                    "Invalid movie ID");
                return BadRequest(errorResponse);
            }

            var result = await _movieService.DeleteMovieAsync(id);
            if (result)
            {
                return NoContent();
            }
            else
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status404NotFound,
                    "Movie not found",
                    $"Movie with ID {id} not found");
                return NotFound(errorResponse);
            }
        }

        [HttpGet]
        [Authorize(Roles = "customer,admin")]
        public async Task<ActionResult<List<MovieInfo>>> GetMoviesAsync()
        {
            var movies = await _movieService.GetMoviesAsync();
            if (movies == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status404NotFound,
                    "Movies not found",
                    "Movies not found");
                return NotFound(errorResponse);
            }
            else
            {
                return Ok(movies);
            }
        }

        //POst api/movie/search
        [HttpPost("search")]
        public async Task<ActionResult<List<MovieInfo>>> SearchMoviesAsync([FromBody] MovieSearchFilter filter)
        {
            var movies = await _movieService.SearchMoviesAsync(filter);
            if (movies == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status404NotFound,
                    "Movies not found",
                    "Movies not found");
                return NotFound(errorResponse);
            }
            else
            {
                return Ok(movies);
            }
        }

        [HttpGet("rating")]
        public async Task<IActionResult> GetMovieRating([FromQuery] string title)
        {
            var movieData = await _omdbService.GetMovieRatingAsync(title);

            if (movieData == null)
            {
          
                return NotFound($"Movie with title '{title}' not found.");
            }

            return Ok(new
            {
                Title = movieData.Title,
                IMDbRating = movieData.imdbRating
            });
        }

    }
}