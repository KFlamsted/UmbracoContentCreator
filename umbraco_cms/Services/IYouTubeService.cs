using UmbracoCms.Models;

namespace UmbracoCms.Services
{
    /// <summary>
    /// Service interface for YouTube API operations
    /// </summary>
    public interface IYouTubeService
    {
        /// <summary>
        /// Get videos from a YouTube channel
        /// </summary>
        /// <param name="channelId">YouTube channel ID</param>
        /// <param name="maxResults">Maximum number of videos to return (1-50)</param>
        /// <returns>List of video summaries</returns>
        Task<VideoListResponse> GetChannelVideosAsync(string channelId, int maxResults = 10);
    }
} 