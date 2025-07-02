/**
 * Video summary information returned by the YouTube API proxy
 * Matches the C# VideoSummary model from UmbracoCms.Models
 */
export interface VideoSummary {
  /**
   * YouTube video ID
   */
  videoId: string;
  
  /**
   * Video title
   */
  title: string;
  
  /**
   * Video description
   */
  description: string;
  
  /**
   * Thumbnail URL (best quality available)
   */
  thumbnailUrl: string;
  
  /**
   * Full YouTube URL for the video
   */
  youtubeUrl: string;
}

/**
 * Response from the YouTube channel videos API endpoint
 * Matches the C# VideoListResponse model structure
 */
export interface VideoListResponse {
  /**
   * List of video summaries
   */
  videos: VideoSummary[];
  
  /**
   * Total number of results available
   */
  totalResults: number;
  
  /**
   * Token for the next page of results (if available)
   */
  nextPageToken?: string;
  
  /**
   * Token for the previous page of results (if available)
   */
  prevPageToken?: string;
} 