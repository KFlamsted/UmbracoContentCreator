using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace UmbracoCms.Controllers.Api
{
    /// <summary>
    /// YouTube API proxy controller for Umbraco 15
    /// Securely handles YouTube API calls without exposing the API key to the frontend
    /// </summary>
    [ApiController]
    [Route("api/youtube")]
    public class YouTubeController : Controller
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;
        private readonly ILogger<YouTubeController> _logger;

        public YouTubeController(
            IConfiguration configuration, 
            HttpClient httpClient,
            ILogger<YouTubeController> logger)
        {
            // Store API key securely in appsettings.json
            _apiKey = configuration["GoogleApiKey"] ?? 
                     throw new InvalidOperationException("GoogleApiKey not configured");
            _httpClient = httpClient;
            _logger = logger;
        }

        /// <summary>
        /// Get latest videos from a YouTube channel
        /// </summary>
        /// <param name="channelId">YouTube channel ID</param>
        /// <param name="maxResults">Maximum number of videos to return (default: 10)</param>
        /// <returns>YouTube search response with videos</returns>
        [HttpGet("channel/{channelId}/videos")]
        public async Task<IActionResult> GetChannelVideos(string channelId, int maxResults = 10)
        {
            try
            {
                // Validate inputs
                if (string.IsNullOrWhiteSpace(channelId))
                {
                    return BadRequest(new { error = "Channel ID is required" });
                }

                if (maxResults < 1 || maxResults > 50)
                {
                    return BadRequest(new { error = "maxResults must be between 1 and 50" });
                }

                // Build YouTube API URL
                var url = $"https://www.googleapis.com/youtube/v3/search" +
                         $"?part=snippet" +
                         $"&channelId={Uri.EscapeDataString(channelId)}" +
                         $"&maxResults={maxResults}" +
                         $"&order=date" +
                         $"&type=video" +
                         $"&key={_apiKey}";

                _logger.LogInformation("Fetching YouTube videos for channel: {ChannelId}", channelId);

                var response = await _httpClient.GetAsync(url);
                
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("YouTube API error: {StatusCode} - {ReasonPhrase}", 
                        response.StatusCode, response.ReasonPhrase);
                    
                    return StatusCode((int)response.StatusCode, 
                        new { error = $"YouTube API error: {response.ReasonPhrase}" });
                }

                var content = await response.Content.ReadAsStringAsync();
                
                // Parse and return the JSON response
                var jsonResponse = JsonSerializer.Deserialize<object>(content);
                return Ok(jsonResponse);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Network error while fetching YouTube videos");
                return StatusCode(500, new { error = "Network error occurred" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while fetching YouTube videos");
                return StatusCode(500, new { error = "An unexpected error occurred" });
            }
        }

        /// <summary>
        /// Get YouTube channel information
        /// </summary>
        /// <param name="channelId">YouTube channel ID</param>
        /// <returns>YouTube channel information</returns>
        [HttpGet("channel/{channelId}/info")]
        public async Task<IActionResult> GetChannelInfo(string channelId)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(channelId))
                {
                    return BadRequest(new { error = "Channel ID is required" });
                }

                // Build YouTube API URL
                var url = $"https://www.googleapis.com/youtube/v3/channels" +
                         $"?part=snippet,statistics" +
                         $"&id={Uri.EscapeDataString(channelId)}" +
                         $"&key={_apiKey}";

                _logger.LogInformation("Fetching YouTube channel info for: {ChannelId}", channelId);

                var response = await _httpClient.GetAsync(url);
                
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("YouTube API error: {StatusCode} - {ReasonPhrase}", 
                        response.StatusCode, response.ReasonPhrase);
                    
                    return StatusCode((int)response.StatusCode, 
                        new { error = $"YouTube API error: {response.ReasonPhrase}" });
                }

                var content = await response.Content.ReadAsStringAsync();
                
                // Parse and return the JSON response
                var jsonResponse = JsonSerializer.Deserialize<object>(content);
                return Ok(jsonResponse);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Network error while fetching YouTube channel info");
                return StatusCode(500, new { error = "Network error occurred" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while fetching YouTube channel info");
                return StatusCode(500, new { error = "An unexpected error occurred" });
            }
        }

        /// <summary>
        /// Health check endpoint to verify the controller is working
        /// </summary>
        /// <returns>Simple health check response</returns>
        [HttpGet("health")]
        public IActionResult HealthCheck()
        {
            return Ok(new { 
                status = "healthy", 
                timestamp = DateTime.UtcNow,
                message = "YouTube API proxy is running"
            });
        }
    }
} 