namespace UmbracoCms.Models
{
    /// <summary>
    /// Response model for video list endpoints
    /// </summary>
    public class VideoListResponse
    {
        public List<VideoSummary> Videos { get; set; } = new();
        public int TotalResults { get; set; }
        public string? NextPageToken { get; set; }
        public string? PrevPageToken { get; set; }
    }
} 