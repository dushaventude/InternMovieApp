using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs.MovieDtos;

using MovieApp.Business.Services;
using MovieApp.Business.Utilities;

namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
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
            if (movieDto == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "Movie Create Details Required",
                    $"Movie is required to create");
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

            return CreatedAtAction(nameof(GetMovieById),new {Id = createdMovie.Id}, createdMovie);
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

    }
}
