using Microsoft.AspNetCore.Mvc;
using UmbracoCms.Models;
using UmbracoCms.Services;

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
        private readonly IYouTubeService _youTubeService;
        private readonly ILogger<YouTubeController> _logger;

        public YouTubeController(
            IYouTubeService youTubeService,
            ILogger<YouTubeController> logger)
        {
            _youTubeService = youTubeService;
            _logger = logger;
        }

        /// <summary>
        /// Get latest videos from a YouTube channel
        /// </summary>
        /// <param name="channelId">YouTube channel ID</param>
        /// <param name="maxResults">Maximum number of videos to return (default: 10)</param>
        /// <returns>Simplified video list with thumbnails, descriptions and YouTube URLs</returns>
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

                var result = await _youTubeService.GetChannelVideosAsync(channelId, maxResults);
                return Ok(result);
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

                var result = await _youTubeService.GetChannelInfoAsync(channelId);
                return Ok(result);
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