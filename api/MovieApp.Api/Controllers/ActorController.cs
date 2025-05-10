using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;

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
                return NotFound();
            }
            return Ok(actor);
        }
    }
}