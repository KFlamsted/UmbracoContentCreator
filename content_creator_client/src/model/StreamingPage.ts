/**
 * StreamingPage model interface based on Umbraco StreamingPage content type
 */
export interface StreamingPage {
  /**
   * Description for the page
   */
  description?: string;
  
  /**
   * Title for the page
   */
  pageTitle?: string;
  
  /**
   * Username/channel used for livestreaming on twitch
   */
  twitchUsername?: string;
  
  /**
   * Handle for youtube without the @. This is only for youtube livestreams.
   * Remember to create a full youtube page for videos.
   */
  youtubeChannelName?: string;
}
