using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
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


        public async Task<Actor> AddActorAsync(Actor actor)
        {
            _movieDbContext.Actors.Add(actor);
            await _movieDbContext.SaveChangesAsync();
            return actor;
        }



        public async Task<bool> DeleteActorAsync(Actor actor)
        {
            _movieDbContext.Actors.Remove(actor);
            await _movieDbContext.SaveChangesAsync();
            return true;
        }

        public async Task<Actor> UpdateActorAsync(Actor actor)
        {
            _movieDbContext.Actors.Update(actor);
            await _movieDbContext.SaveChangesAsync();
            return actor;
        }

        public async Task<(int TotalCount, List<Actor> Actors)> GetAllAsync(int pageNumber, int pageSize)
        {
            var skipNumber = (pageNumber - 1) * pageSize;
            return (await _movieDbContext.Actors.CountAsync(), await _movieDbContext.Actors.Skip(skipNumber).Take(pageSize).ToListAsync());
        }
    }
}
