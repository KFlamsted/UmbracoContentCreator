/**
 * YoutubeParentPage
 */
import type { YoutubePage } from './YoutubePage';

export interface YoutubeParentPage {
  /**
   * The collection of YoutubePage items under this parent
   */
  children?: YoutubePage[];
} 