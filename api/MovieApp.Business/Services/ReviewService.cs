using Microsoft.AspNetCore.Identity;
using MovieApp.Business.DTOs;
using MovieApp.Data.Entities;
using MovieApp.Data.Repositories;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieApp.Business.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly UserManager<ApplicationUser> _userManager; // Add UserManager
        private readonly IMapper _mapper;

        public ReviewService(IReviewRepository reviewRepository, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _reviewRepository = reviewRepository;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<ReviewDto> AddReviewAsync(string userId, AddReviewDto dto)
        {
            // Fetch the user from the database
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var review = _mapper.Map<Review>(dto); // AddReviewDto → Review
            review.UserId = userId;

            var savedReview = await _reviewRepository.AddReviewAsync(review);

            var reviewDto = _mapper.Map<ReviewDto>(savedReview);

            return reviewDto;
        }

        public async Task<List<ReviewDto>> GetReviewsByMovieIdAsync(int movieId)
        {
            var reviews = await _reviewRepository.GetReviewsByMovieIdAsync(movieId);

            return _mapper.Map<List<ReviewDto>>(reviews);
        }

        public async Task<bool> DeleteReviewAsync(string userId, int reviewId)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(reviewId);

            if (review == null)
                throw new Exception("Review not found");

            if (review.UserId != userId) // Ensure user owns the review
                throw new UnauthorizedAccessException("You can only delete your own reviews.");

            return await _reviewRepository.DeleteReviewAsync(review);
        }

        public async Task<ReviewDto> UpdateReviewAsync(string userId, int reviewId, AddReviewDto dto)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(reviewId);

            if (review == null)
                throw new Exception("Review not found");

            if (review.UserId != userId) // Ensure user owns the review
                throw new UnauthorizedAccessException("You can only update your own reviews.");

            _mapper.Map(dto, review);

            var updatedReview = await _reviewRepository.UpdateReviewAsync(review);

            return _mapper.Map<ReviewDto>(updatedReview);
        }

    }
}
