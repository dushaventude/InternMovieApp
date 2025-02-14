using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs.MovieDtos;
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
            _movieService = movieService;
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetMovieById(int Id)
        {
            var movie = await _movieService.GetMovieById(Id);

            if (movie == null) return NotFound(new 
            {
                Message="Movie {Id} not Found"
            });

            return Ok(movie);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] MovieDto movieDto)
        {
            if (movieDto == null)
            {
                return BadRequest("Movie data is required.");
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
                return BadRequest();
            }
            return Ok(updatedMovie);
        }
    }
}
