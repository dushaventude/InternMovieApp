using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace MovieApp.Data.Repositories
{
    public interface ITokenRepository
    {
        Task<string> CreateJWTtoken(IdentityUser user, List<string> roles);
    }
}
