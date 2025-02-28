using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Business.DTOs;
using MovieApp.Business.Services;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MovieApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication for all endpoints
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

      //  [Authorize(Roles = "Admin,Customer")]
        [HttpPost]
        public async Task<IActionResult> AddReview([FromBody] AddReviewDto dto)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Extract User ID from Token
                if (userId == null)
                {
                    return Unauthorized(new { message = "Invalid token, user not found." });
                }

                var review = await _reviewService.AddReviewAsync(userId, dto);
                return Ok(review);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "Internal Server Error" });

            }
        }

        // Get Reviews for a Movie (JWT not required)
        [HttpGet("{movieId}")]
        [AllowAnonymous] // Public endpoint, no token required
        public async Task<IActionResult> GetReviews(int movieId)
        {
            var reviews = await _reviewService.GetReviewsByMovieIdAsync(movieId);
            return Ok(reviews);
        }

        [HttpDelete("{reviewId}")]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { message = "Invalid token, user not found." });

            try
            {
                var isDeleted = await _reviewService.DeleteReviewAsync(userId, reviewId);
                if (isDeleted)
                    return Ok(new { message = "Review deleted successfully" });

                return NotFound(new { message = "Review not found" });
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

       // [Authorize(Roles = "Admin,Customer")]
        [HttpPut("{reviewId}")]
        public async Task<IActionResult> UpdateReview(int reviewId, [FromBody] AddReviewDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { message = "Invalid token, user not found." });

            try
            {
                var updatedReview = await _reviewService.UpdateReviewAsync(userId, reviewId, dto);
                return Ok(updatedReview);
            }
            catch (UnauthorizedAccessException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    }
}

