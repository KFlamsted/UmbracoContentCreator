/**
 * BlueskyPage model interface based on Umbraco BlueskyPage content type
 */
export interface BlueskyPage {
  /**
   * The amount of posts to show initially
   */
  amountOfPosts: number;
  
  /**
   * Small description on top of the bluesky page
   */
  description?: string;
  
  /**
   * Enable "load more posts"
   */
  enableLoadMore: boolean;
  
  /**
   * Title for the page on the website
   */
  pageTitle?: string;
  
  /**
   * Bluesky profile. Remember the full profile. Can be found in the bsky url.
   */
  profile?: string;
}
