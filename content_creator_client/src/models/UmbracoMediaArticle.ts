/**
 * Article
 */
export interface UmbracoMediaArticle {
  /**
   * Size in bytes
   */
  umbracoBytes: number;
  /**
   * Type
   */
  umbracoExtension?: string;
  /**
   * Article
   */
  umbracoFile?: string;
}
