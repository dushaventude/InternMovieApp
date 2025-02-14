using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;

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
