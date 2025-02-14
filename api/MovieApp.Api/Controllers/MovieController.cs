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

        private readonly IMovieService movieService;

        public MovieController(IMovieService movieService)
        {
            this.movieService = movieService;
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
            var movies = await movieService.GetMoviesAsync();
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

