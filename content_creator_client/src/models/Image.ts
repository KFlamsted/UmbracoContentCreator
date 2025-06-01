import type { ImageCropperValue } from './common/ImageCropperValue';

/**
 * Image
 */
export interface Image {
  /**
   * Size in bytes
   */
  umbracoBytes: number;
  /**
   * Type
   */
  umbracoExtension?: string;
  /**
   * Image cropper value (structure depends on Umbraco config)
   */
  umbracoFile?: ImageCropperValue;
  /**
   * Height in pixels
   */
  umbracoHeight: number;
  /**
   * Width in pixels
   */
  umbracoWidth: number;
}
