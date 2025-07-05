namespace UmbracoCms.Models
{
    /// <summary>
    /// Simplified video information returned by our API
    /// </summary>
    public class VideoSummary
    {
        public string VideoId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ThumbnailUrl { get; set; } = string.Empty;
        public string YoutubeUrl { get; set; } = string.Empty;
    }
} 