import type { ImageCropperValue } from './common/ImageCropperValue';
import type { IUmbracoBlock } from './common/UmbracoCommon';

/**
 * Link model for related links
 */
export interface Link {
  name?: string;
  target?: string;
  type: 'Content' | 'Media' | 'External';
  udi?: string;
  url: string;
}

/**
 * Author content reference
 */
export interface AuthorReference {
  id: string;
  name: string;
  contentType: string;
  url?: string;
}

/**
 * News item page model
 */
export interface NewsItemPage {
  /**
   * Unique identifier
   */
  id?: string;
  /**
   * Attachments
   */
  attachements?: ImageCropperValue[];
  /**
   * Author
   */
  author?: AuthorReference;
  /**
   * Body text content
   */
  bodyText?: {
    markup: string;
    blocks: IUmbracoBlock[];
  };
  /**
   * Featured flag
   */
  featured?: boolean;
  /**
   * Main image
   */
  mainImage?: ImageCropperValue;
  /**
   * Publish date
   */
  publishDate?: string;
  /**
   * Related links
   */
  relatedLinks?: Link[];
  /**
   * Summary text
   */
  summary?: string;
  /**
   * Title
   */
  title?: string;
}
