using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public interface IActorRepository
    {
        Task<Actor> GetActorAsync(int id);
        Task<Actor> AddActorAsync(Actor actor);
       
    }
}
