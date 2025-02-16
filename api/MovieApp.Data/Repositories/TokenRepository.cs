using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace MovieApp.Data.Repositories
{
    public class TokenRepository: ITokenRepository
    {
        private readonly IConfiguration configuration;

        public TokenRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> CreateJWTtoken(IdentityUser user, List<string> roles)
        {

            //string userId, firstName;


            //using (var connection = new SqlConnection(connectionString))
            //{
            //    await connection.OpenAsync();

            //    var query = "SELECT Id,FirstName FROM Users WHERE Email = @Email";
            //    var command = new SqlCommand(query, connection);
            //    command.Parameters.AddWithValue("@Email", user.Email);

            //    // userId = (string)await command.ExecuteScalarAsync();
            //    using (var reader = await command.ExecuteReaderAsync())
            //    {
            //        if (await reader.ReadAsync())
            //        {
            //            userId = reader["Id"]?.ToString();
            //            firstName = reader["FirstName"]?.ToString();
            //        }
            //        else
            //        {
            //            throw new Exception("Sorry, we can't find the user you're looking for. The account may have been removed.");
            //        }
            //    }
            //}

            //if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(firstName))
            //{
            //    throw new Exception("Required user details are missing.");
            //}

            //create claims
            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Name, user.UserName));

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            //create token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:KEY"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
