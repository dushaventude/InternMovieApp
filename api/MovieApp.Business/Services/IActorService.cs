using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieApp.Business.Services
{
    public interface IActorService
    {
        Task<ActorInfo> GetActorById(int id);
        Task<bool> DeleteActorById(int id); 
        Task<ActorInfo> UpdateActorById(int id, ActorUpdateInfo actorUpdateInfo);  // New method for updating
    }
}
