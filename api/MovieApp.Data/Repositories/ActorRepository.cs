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
        
    }
}
