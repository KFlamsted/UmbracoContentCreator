import type { ImageCropperValue } from './common/ImageCropperValue';
import type { IUmbracoBlock } from './common/UmbracoCommon';

/**
 * News page model
 */
export interface News {
  /**
   * Category filter options
   */
  categoryFilterOptions?: string[];
  /**
   * Default sort order
   */
  defaultSortOrder?: string;
  /**
   * Description for the news page
   */
  description?: {
    markup: string;
    blocks: IUmbracoBlock[];
  };
  /**
   * Main Image
   */
  mainImage?: ImageCropperValue;
  /**
   * News per page
   */
  newsPerPage?: number;
  /**
   * Show featured news
   */
  showFeaturedNews?: boolean;
  /**
   * Title for the news page
   */
  title?: string;
}
