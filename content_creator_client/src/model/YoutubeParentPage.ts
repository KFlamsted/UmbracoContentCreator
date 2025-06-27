/**
 * YoutubeParentPage
 */
import type { YoutubePage } from './YoutubePage';

export interface YoutubeParentPage {
  /**
   * Unique identifier
   */
  id?: string;
  /**
   * The collection of YoutubePage items under this parent
   */
  children?: YoutubePage[];
} 