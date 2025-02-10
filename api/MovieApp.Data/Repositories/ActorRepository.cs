using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public class ActorRepository:IActorRepository
    {
        private readonly MovieDbContext _movieDbContext;

        public ActorRepository(MovieDbContext movieDbContext)
        {
            this._movieDbContext = movieDbContext;
        }

        public async Task<ActorDataModel> getActorAsync(int id)
        {
            var actor = await _movieDbContext.Actors.FirstOrDefaultAsync(u=>u.Id == id);
            if (actor == null)
            {
                throw new Exception("user not found");
            }
            else
            {
                return actor;
            }
                
                

        }
    }
}
