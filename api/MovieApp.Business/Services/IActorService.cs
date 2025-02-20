using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Business.DTOs.ActorDtos;

namespace MovieApp.Business.Services
{
    public interface IActorService
    {
        Task<GetAllActorsDto> GetActors(int pageNumber, int pageSize);
        Task<ActorInfo> GetActorById(int id);
        Task<ActorInfo> AddActorAsync(CreateActorInfo createActorInfo);
        Task<bool> DeleteActorById(int id);
        Task<ActorInfo> UpdateActorById(int id, ActorUpdateInfo actorUpdateInfo);  // New method for updating

    }
}
