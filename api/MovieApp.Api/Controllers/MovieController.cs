using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.Services;

namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            this._movieService = movieService;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid movie ID");
            }

            var result = await _movieService.DeleteMovieAsync(id);
            if (result)
            {
                return NoContent();
            }
            else
            {
                return NotFound($"Movie with ID {id} not found");
            }
        }
    }
}