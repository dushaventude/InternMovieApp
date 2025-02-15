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

        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieDto movieDto)
        {
            if (movieDto == null)
            {
                return BadRequest("Movie data is required.");
            }
            var createdMovie = await _movieService.CreateMovie(movieDto);

            return CreatedAtAction(nameof(Create), createdMovie);
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Update(int Id, [FromBody] UpdateMovieDto movieDto)
        {
            Console.WriteLine(Id);
            var updatedMovie = await _movieService.UpdateMovie(Id, movieDto);
            if (updatedMovie == null)
            {
                return BadRequest();
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
        public async Task<ActionResult<List<MovieInfo>>> GetMoviesAsync()
        {
            var movies = await _movieService.GetMoviesAsync();
            if (movies == null)
            {
                return NotFound("Movies Not Found");
            }
            else
            {
                return Ok(movies);
            }
        }
    }
}
