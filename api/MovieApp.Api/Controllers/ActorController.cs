using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
using MovieApp.Business.Utilities;
using MovieApp.Shared.Models;
using System.Threading.Tasks;

namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly IActorService _actorService;

        public ActorController(IActorService actorService)
        {
            this._actorService = actorService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorInfo>> GetActorById(int id)
        {
            var actor = await _actorService.GetActorById(id);
            if (actor == null)
            {
                var errorResponse = ErrorResponseFactory.CreateErrorResponse(
                    StatusCodes.Status404NotFound,
                    "Actor not found",
                    $"Actor with ID {id} not found");
                return NotFound(errorResponse);
            }
            return Ok(actor);
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
    }
}