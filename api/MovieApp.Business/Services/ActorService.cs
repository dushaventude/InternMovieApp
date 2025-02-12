using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs;
using MovieApp.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
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

                return actorInfo;
            }
            catch (Exception ex)
            {
                //TODO: Error Logs
                return null;
            }
        }
        public async Task<ActorInfo> AddActor(ActorInfo actorInfo)
        {
            tvar actor = new ActorInfo
            {
                Name = actorInfo.Name
                Gender = actorInfo.Gender,
                Country = actorInfo.Country,
            };

            var addedActor = await _actorRepository.AddActorAsync(actor);
            if (addedActor != null) {
                return new ActorInfo
                {
                    Id = addedActor.Id,
                    Name = addedActor.Name,
                    Gender = addedActor.Gender,
                    Country = addedActor.Country,
                };
            }
            return null;
