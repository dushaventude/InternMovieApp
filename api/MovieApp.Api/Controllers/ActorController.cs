using System.Runtime.InteropServices.JavaScript;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using MovieApp.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
using MovieApp.Business.Utilities;
using MovieApp.Shared.Models;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Query;


namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly IActorService _actorService;
        private readonly IMapper _mapper;

        public ActorController(IActorService actorService, IMapper mapper)
        {
            this._actorService = actorService;
            this._mapper = mapper;

        }


        [HttpGet]
        public async Task<IActionResult> GetAllActors(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? name = null)
        {
            var actors = await _actorService.GetActors(pageNumber, pageSize);
            return Ok(actors);
        }

        [HttpPost]
        public async Task<ActionResult<ActorInfo>> AddActor(CreateActorInfo createActorInfo)

        {
            if (createActorInfo == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status400BadRequest,
                    "Invalid request",
                    "Actor data is required.");
                return BadRequest(errorResponse);
            }

            var addedActor = await _actorService.AddActorAsync(createActorInfo);
            if (addedActor == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status500InternalServerError,
                    "Failed to add actor",
                    "Failed to add actor.Internal Server Error");
                return BadRequest(errorResponse);
            }

            return CreatedAtAction(nameof(GetActorById), new { id = addedActor.Id }, addedActor);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorInfo>> GetActorById(int id)
        {
            var actor = await _actorService.GetActorById(id);
            if (actor == null)
            {
                return NotFound("Actor Not Found");
            }
            else
            {
                return Ok(actor);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteActorById(int id)
        {
            var result = await _actorService.DeleteActorById(id);
            if (result == false)
            {
                return NotFound("Actor Not Found");
            }
            else
            {
                return NoContent();
            }

        }

        [HttpPut]
        public async Task<IActionResult> UpdateActorById(int id, [FromBody] ActorUpdateInfo actorUpdateInfo)
        {
            if (actorUpdateInfo == null)
            {
                return BadRequest("Invalid actor data");
            }

            var updatedActor = await _actorService.UpdateActorById(id, actorUpdateInfo);

            if (updatedActor == null)
            {
                return NotFound("Actor not found");
            }

            return Ok(updatedActor);

        }
    }
}