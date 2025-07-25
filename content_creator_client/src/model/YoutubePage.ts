/**
 * YoutubePage
 */
export interface YoutubePage {
  /**
   * Unique identifier
   */
  id?: string;
  /**
   * Amount of videos shown.
   */
  amountOfVideos?: number;
  /**
   * Url for a featured video. Shown as a larger than the other
   */
  featuredVideoUrl?: string;
  /**
   * Name in the menu
   */
  menuName?: string;
  /**
   * Page title (Could be the same as the Menu name)
   */
  pageTitle?: string;
  /**
   * Actual name for the channel on youtube. Without @.
   */
  youtubeChannelName?: string;
  /**
   * The channels actual Id (for API calls, e.g., UCxxxxxxxxxxxxxxxxxxxxxxx)
   */
  channelId?: string;
} 