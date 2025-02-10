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

        //get actor by id
        Task<ActorDataModel> getActorAsync(int id);
    }
}
