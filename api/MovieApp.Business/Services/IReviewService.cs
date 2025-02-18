using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Business.DTOs;

namespace MovieApp.Business.Services
{
    public interface IReviewService
    {
        Task<ReviewDto> AddReviewAsync(string userId, AddReviewDto dto);
        Task<List<ReviewDto>> GetReviewsByMovieIdAsync(int movieId);
        Task<bool> DeleteReviewAsync(string userId, int reviewId); // Delete Review
        Task<ReviewDto> UpdateReviewAsync(string userId, int reviewId, AddReviewDto dto); // Update Review
    }
}
