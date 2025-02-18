using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public interface IReviewRepository
    {
        Task<Review> AddReviewAsync(Review review);
        Task<List<Review>> GetReviewsByMovieIdAsync(int movieId);
        Task<Review> GetReviewByIdAsync(int reviewId);
        Task<bool> DeleteReviewAsync(Review review);
        Task<Review> UpdateReviewAsync(Review review);
    }
}

