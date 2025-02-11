using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public class ActorRepository : IActorRepository
    {
        private readonly MovieDbContext _movieDbContext;

       

        public ActorRepository(MovieDbContext movieDbContext)
        {
            this._movieDbContext = movieDbContext;
        }

        public async Task<Actor> GetActorAsync(int id)
        {
            var actor = await _movieDbContext.Actors.FirstOrDefaultAsync(u => u.Id == id);
            return actor;
        }
        public async Task<bool> DeleteAsync(Actor actor)
        {
            _movieDbContext.Actors.Remove(actor);
            await _movieDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<Actor> UpdateActorAsync(Actor actor)
        {
            var existingActor = await _movieDbContext.Actors.FindAsync(actor.Id);
            if (existingActor == null) return null;

            existingActor.Name = actor.Name;
            existingActor.Gender = actor.Gender;
            existingActor.Country = actor.Country;

            _movieDbContext.Actors.Update(existingActor);
            await _movieDbContext.SaveChangesAsync();

            return existingActor;
        }
    }
}
