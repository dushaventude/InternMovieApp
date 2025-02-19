using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieApp.Data.Entities;

namespace MovieApp.Data.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly MovieDbContext _context;

        public ReviewRepository(MovieDbContext context)
        {
            _context = context;
        }

        public async Task<Review> AddReviewAsync(Review review)
        {
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return await _context.Reviews
                .Include(r => r.User) 
                .FirstOrDefaultAsync(r => r.Id == review.Id);

        }

        public async Task<List<Review>> GetReviewsByMovieIdAsync(int movieId)
        {
            return await _context.Reviews
                .Where(r => r.MovieId == movieId)
                .Include(r => r.User)
                .ToListAsync();
        }
        public async Task<bool> DeleteReviewAsync(Review review)
        {
            _context.Reviews.Remove(review);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Review> GetReviewByIdAsync(int reviewId)
        {
            return await _context.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);
        }
        public async Task<Review> UpdateReviewAsync(Review review)
        {
            _context.Reviews.Update(review);
            await _context.SaveChangesAsync();
            return await _context.Reviews
               .Include(r => r.User)
               .FirstOrDefaultAsync(r => r.Id == review.Id);
        }

    }
}

