using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public interface ITokenRepository
    {
        Task<string> CreateJWTtoken(IdentityUser user, List<string> roles);
    }
}
