using AutoMapper;
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
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public ActorService(IActorRepository actorRepository,IMapper mapper,ILogger<ActorService> logger)
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

                var actorInfo = _mapper.Map<ActorInfo>(actor);

                return actorInfo;
            }
            catch (Exception ex)
            {
               
                _logger.LogError($"Error fetching actor with ID {id}: {ex.Message}");
                return null;
            }
        }
    }
}
