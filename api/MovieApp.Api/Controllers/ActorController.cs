using Microsoft.AspNetCore.Http;
using MovieApp.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
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
        public async Task<ActionResult<ActorInfo>> GetActorById(int id)
        {
            var actor=await _actorService.GetActorById(id);
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
