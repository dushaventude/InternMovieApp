using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using MovieApp.Business.DTOs.ImdbDto;

namespace MovieApp.Business.Services
{
    public class OmdbService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<OmdbService> _logger;

        public OmdbService(HttpClient httpClient, string apiKey, ILogger<OmdbService> logger)
        {
            _httpClient = httpClient;
            _apiKey = apiKey;
            _logger = logger;
        }

        public async Task<OmdbApiResponse> GetMovieRatingAsync(string title)
        {
            try
            {
                //API URL
                var requestUrl = $"http://www.omdbapi.com/?t={Uri.EscapeDataString(title)}&apikey={_apiKey}";

                var response = await _httpClient.GetAsync(requestUrl);

               
                response.EnsureSuccessStatusCode();

                
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var movieData = JsonSerializer.Deserialize<OmdbApiResponse>(jsonResponse);

                // Check if the API returned a valid response
                if (movieData?.Response == "True")
                {
                    return movieData;
                }
                else
                {
                    _logger.LogWarning($"Movie not found: {title}");
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching movie rating: {ex.Message}");
                return null;
            }
        }
    }
}
