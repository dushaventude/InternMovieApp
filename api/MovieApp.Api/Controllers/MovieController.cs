
﻿using Microsoft.AspNetCore.Http;
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
