using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;
using AutoMapper;
using System.Threading.Tasks;

namespace MovieApp.Business.Services
{
    public class ActorService : IActorService
    {
        private readonly IActorRepository _actorRepository;
        private readonly ILogger<ActorService> _logger;
        private readonly IMapper _mapper;

        public ActorService(IActorRepository actorRepository, ILogger<ActorService> logger, IMapper mapper)
        {
            _actorRepository = actorRepository;
            _logger = logger;
            _mapper = mapper;
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
                _logger.LogError(ex, "Error occurred while fetching actor with ID: {Id}", id);
                return null;
            }
        }

        public async Task<ActorInfo> AddActorAsync(CreateActorInfo createActorInfo)
        {
            try
            {
                
                var actor = _mapper.Map<Actor>(createActorInfo);

                var addedActor = await _actorRepository.AddActorAsync(actor);
                if (addedActor != null)
                {
                    
                    return _mapper.Map<ActorInfo>(addedActor);
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding actor: {CreateActorInfo}", createActorInfo);
                return null;
            }
        }

       
    }
}