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
        Task<bool> DeleteAsync(Actor actor); // New method for deleting
        Task<Actor> UpdateActorAsync(Actor actor);  // New method for updating
    }
}
