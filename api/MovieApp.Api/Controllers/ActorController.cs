using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
using MovieApp.Data.Entities;

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

        [HttpGet]
        public async Task<ActorInfo> GetActorById(int id)
        {
            return await _actorService.GetActorById(id);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteActorById(int id)
        {
            var result = await _actorService.DeleteActorById(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateActor(int id, [FromBody] ActorUpdateInfo actorUpdateInfo)
        {
            if (actorUpdateInfo == null)
            {
                return BadRequest("Invalid actor data");
            }

            var actor = new Actor
            {
                Id = id,  // The Id comes from the route parameter
                Name = actorUpdateInfo.Name,
                Gender = actorUpdateInfo.Gender,
                Country = actorUpdateInfo.Country
            };

            var updatedActor = await _actorService.UpdateActorAsync(actor);

            if (updatedActor == null)
            {
                return NotFound("Actor not found");
            }

            return Ok(updatedActor); // Returns the ActorInfo, including the Id
        }

    }
}
