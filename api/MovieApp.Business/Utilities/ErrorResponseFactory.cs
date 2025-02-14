using MovieApp.Shared.Models;

namespace MovieApp.Business.Utilities
{
    public static class ErrorResponseFactory
    {
        public static ErrorResponse CreateErrorResponse(int statusCode, string message, string error)
        {
            return new ErrorResponse
            {
                StatusCode = statusCode,
                Message = message,
                Errors = new List<string> { error }
            };
        }
    }
}