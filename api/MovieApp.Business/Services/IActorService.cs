using MovieApp.Business.DTOs;
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
        Task<ActorInfo> AddActorAsync(ActorInfo actorInfo);
    }
}
