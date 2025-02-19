using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;

namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly UserManager<ApplicationUser> userManager;
        public readonly ITokenRepository tokenRepository;
        private readonly IConfiguration configuration;

        public AuthController(UserManager<ApplicationUser> userManager, ITokenRepository tokenRepository, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
            this.configuration = configuration;
        }



        // POST api/auth/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestcsDto)
        {

            if(registerRequestcsDto.Password.Length <8)
            {
                return BadRequest(new { Message = "The password must include at least 8 characters" });
            }

            var existingUser = await userManager.FindByNameAsync(registerRequestcsDto.Username);
            if (existingUser != null)
            {
                return BadRequest(new { Message = "You are already in the system" });
            }

            // Create a new IdentityUser based on the provided username and email
            var identityUser = new ApplicationUser
            {
                UserName = registerRequestcsDto.Username,
                Email = registerRequestcsDto.Username,
                FirstName= registerRequestcsDto.FirstName,
                LastName = registerRequestcsDto.LastName
            };
            // Create the user in the database using the UserManager

            var result = await userManager.CreateAsync(identityUser, registerRequestcsDto.Password);
            if (result.Succeeded)
            {
                // If roles are specified, add the user to the first role in the list
                if (registerRequestcsDto.Roles != null && registerRequestcsDto.Roles.Any())
                {
                    result = await userManager.AddToRoleAsync(identityUser, registerRequestcsDto.Roles[0]);

                    // If the user was successfully added to the role, return a success message

                    if (result.Succeeded)
                    {
                        return Ok("User created");
                    }
                }
            }
            // If the user was created or added to a role, return a success message

            return Ok("User created");

        }



        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
        {
            // Find the user by their username

            var user = await userManager.FindByNameAsync(loginRequestDto.Username);

            if (user != null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

                if (checkPasswordResult)
                {
                    //get roles for this user
                    var roles = await userManager.GetRolesAsync(user);

                    if (roles != null)
                    {
                        //create token
                        var jwtToken = tokenRepository.CreateJWTtoken(user, roles.ToList());

                        var response = new
                        {
                            JwtToken = jwtToken.Result
                        };

                        return Ok(response);
                    }
                }
            }
            // If the login was unsuccessful, return a bad request message
            return BadRequest("Username or password incorrect");
        }


      ////  TODO://
      //  [HttpGet("get-user/{id}")]
      //  public async Task<IActionResult> GetUserById(string id)
      //  {
      //      var user = await _userManager.FindByIdAsync(id);
      //      if (user == null)
      //          return NotFound("User not found");

      //      return Ok(new
      //      {
      //          user.Id,
      //          user.FirstName,
      //          user.LastName,
      //          user.Email,
      //          user.UserName
      //      });
      //  }



        //[HttpGet("get-all-users")]
        //public async Task<IActionResult> GetAllUsers()
        //{
        //    var users = _userManager.Users.ToList();

        //    var userList = users.Select(user => new
        //    {
        //        user.Id,
        //        user.FirstName,
        //        user.LastName,
        //        user.Email,
        //        user.UserName
        //    });

        //    return Ok(userList);
        //}



    }
}
