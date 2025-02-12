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

        [HttpGet]
        public async Task<ActorInfo> GetActorById(int id)
        {
            return await _actorService.GetActorById(id);
        }

        [HttpPost]
        public async Task<ActorInfo> AddActor(ActorInfo actorInfo)
        {
            var addedActor = await _actorService.AddActor(actorInfo);
            if (addedActor != null)
            {
                return addedActor;
            }
        }
    }
}
