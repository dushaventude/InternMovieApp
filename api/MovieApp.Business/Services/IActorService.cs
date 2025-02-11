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
        Task<bool> DeleteActorById(int id); // Change return type to bool
        Task<ActorInfo> UpdateActorAsync(Actor actor);  // New method for updating
    }
}
