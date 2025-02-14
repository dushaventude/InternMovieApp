using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;
using AutoMapper;
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
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public ActorService(IActorRepository actorRepository, IMapper mapper, ILogger<ActorService> logger)
        {
            this._actorRepository = actorRepository;
            this._mapper = mapper;
            this._logger = logger;
        }

        public async Task<ActorInfo> GetActorById(int id)
        {
            try
            {
                var actor = await _actorRepository.GetActorAsync(id);
                if (actor == null)
                {
                    return null;
                }

                //TODO: AutoMapper configuration
                var actorInfo = _mapper.Map<ActorInfo>(actor);

                return actorInfo;
            }
            catch (Exception ex)
            {
                //TODO: Error Logs
                _logger.LogError($"Error fetching actor with ID {id}: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteActorById(int id)
        {
            var actor = await _actorRepository.GetActorAsync(id);
            if (actor == null) return false;

            await _actorRepository.DeleteActorAsync(actor);
            return true;
        }

        public async Task<ActorInfo> UpdateActorById(int id, ActorUpdateInfo actorUpdateInfo)
        {
            try
            {
                var existingActor = await _actorRepository.GetActorAsync(id);
                if (existingActor == null)
                {
                    return null; 
                }
                _mapper.Map(actorUpdateInfo, existingActor);
                var updatedActor = await _actorRepository.UpdateActorAsync(existingActor);
                return _mapper.Map<ActorInfo>(updatedActor);
            }
            catch (Exception ex) 
            {
                _logger.LogError($"Error Updating actor with ID {id}: {ex.Message}");
                return null;
            }
            
        }

    }
}
