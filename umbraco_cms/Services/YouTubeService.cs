using System.Text.Json;
using UmbracoCms.Models;

namespace UmbracoCms.Services
{
    /// <summary>
    /// Service for interacting with YouTube Data API
    /// </summary>
    public class YouTubeService : IYouTubeService
    {
        private readonly string _apiKey;
        private readonly HttpClient _httpClient;
        private readonly ILogger<YouTubeService> _logger;

        public YouTubeService(
            IConfiguration configuration,
            HttpClient httpClient,
            ILogger<YouTubeService> logger)
        {
            _apiKey = configuration["GoogleApiKey"] ?? 
                     throw new InvalidOperationException("GoogleApiKey not configured");
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<VideoListResponse> GetChannelVideosAsync(string channelId, int maxResults = 10)
        {
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
                
                throw new HttpRequestException($"YouTube API error: {response.ReasonPhrase}");
            }

            var content = await response.Content.ReadAsStringAsync();
            return ParseVideoListResponse(content);
        }

        private VideoListResponse ParseVideoListResponse(string jsonContent)
        {
            using var document = JsonDocument.Parse(jsonContent);
            var root = document.RootElement;

            var videoList = new VideoListResponse();

            // Extract pagination info
            if (root.TryGetProperty("pageInfo", out var pageInfo) && 
                pageInfo.TryGetProperty("totalResults", out var totalResults))
            {
                videoList.TotalResults = totalResults.GetInt32();
            }

            if (root.TryGetProperty("nextPageToken", out var nextPageToken))
            {
                videoList.NextPageToken = nextPageToken.GetString();
            }

            if (root.TryGetProperty("prevPageToken", out var prevPageToken))
            {
                videoList.PrevPageToken = prevPageToken.GetString();
            }

            // Extract video items
            if (root.TryGetProperty("items", out var items))
            {
                foreach (var item in items.EnumerateArray())
                {
                    var video = ExtractVideoSummary(item);
                    if (video != null)
                    {
                        videoList.Videos.Add(video);
                    }
                }
            }

            return videoList;
        }

        private VideoSummary? ExtractVideoSummary(JsonElement item)
        {
            try
            {
                // Extract video ID
                if (!item.TryGetProperty("id", out var idElement) ||
                    !idElement.TryGetProperty("videoId", out var videoIdElement))
                {
                    return null;
                }

                var videoId = videoIdElement.GetString();
                if (string.IsNullOrEmpty(videoId))
                {
                    return null;
                }

                // Extract snippet data
                if (!item.TryGetProperty("snippet", out var snippet))
                {
                    return null;
                }

                var title = snippet.TryGetProperty("title", out var titleElement) 
                    ? titleElement.GetString() ?? "No title" 
                    : "No title";

                var description = snippet.TryGetProperty("description", out var descElement) 
                    ? descElement.GetString() ?? "No description" 
                    : "No description";

                // Get the best available thumbnail
                var thumbnailUrl = ExtractBestThumbnail(snippet);

                return new VideoSummary
                {
                    VideoId = videoId,
                    Title = title,
                    Description = description,
                    ThumbnailUrl = thumbnailUrl,
                    YoutubeUrl = $"https://www.youtube.com/watch?v={videoId}"
                };
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to extract video summary from item");
                return null;
            }
        }

        private string ExtractBestThumbnail(JsonElement snippet)
        {
            if (!snippet.TryGetProperty("thumbnails", out var thumbnails))
            {
                return string.Empty;
            }

            // Try to get the best quality thumbnail available
            // Priority: maxres > high > medium > default
            var preferenceOrder = new[] { "maxres", "high", "medium", "default" };
            
            foreach (var preference in preferenceOrder)
            {
                if (thumbnails.TryGetProperty(preference, out var thumbnail) &&
                    thumbnail.TryGetProperty("url", out var urlElement))
                {
                    return urlElement.GetString() ?? string.Empty;
                }
            }

            return string.Empty;
        }
    }
} 