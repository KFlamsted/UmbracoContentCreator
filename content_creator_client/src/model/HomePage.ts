import type { ImageCropperValue } from './common/ImageCropperValue'

/**
 * HomePage
 */
export interface HomePage {
  /**
   * The main content of the page
   */
  bodyText?: string;
  /**
   * Copyright notice for the footer
   */
  footerText?: string;
  /**
   * The main title of the page
   */
  pageTitle?: string;
  /**
   * Background image URL for the homepage hero - now supports full media with crops
   */
  backgroundImage?: ImageCropperValue;
  /**
   * Hexadecimal color used for the webpage theme
   */
  color1?: string;
  /**
   * Hexadecimal color used for the webpage theme
   */
  color2?: string;
  /**
   * Hexadecimal color used for the webpage theme
   */
  color3?: string;
}
