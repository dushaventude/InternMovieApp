using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.Services
{
    public class ActorService : IActorService
    {
        private readonly IActorRepository _actorRepository;

        public ActorService(IActorRepository actorRepository)
        {
            this._actorRepository = actorRepository;
        }

        public async Task<ActorInfo> GetActorById(int id)
        {
            try
            {
                var actor = await _actorRepository.GetActorAsync(id);

                //TODO: AutoMapper configuration
                var actorInfo = new ActorInfo();
                actorInfo.Id = actor.Id;
                actorInfo.Name = actor.Name;
                actorInfo.Gender = actor.Gender;
                actorInfo.Country = actor.Country;

                return actorInfo;
            }
            catch (Exception ex)
            {
                //TODO: Error Logs
                return null;
            }
        }
        public async Task<bool> DeleteActorById(int id)
        {
            var actor = await _actorRepository.GetActorAsync(id);
            if (actor == null) return false;

            await _actorRepository.DeleteAsync(actor);
            return true;
        }
        public async Task<ActorInfo> UpdateActorAsync(Actor actor)
        {
            var actorEntity = new Actor
            {
                Id = actor.Id,
                Name = actor.Name,
                Gender = actor.Gender,
                Country = actor.Country
            };

            var updatedActor = await _actorRepository.UpdateActorAsync(actorEntity);

            if (updatedActor == null) return null;

            return new ActorInfo
            {
                Id = updatedActor.Id,
                Name = updatedActor.Name,
                Gender = updatedActor.Gender,
                Country = updatedActor.Country
            };
        }

       
    }
}
