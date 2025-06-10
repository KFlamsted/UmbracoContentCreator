/**
 * Represents the value structure of Umbraco's Image Cropper property editor.
 * This matches the media delivery API response structure.
 */
interface FocalPoint {
  left: number;
  top: number;
}

interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Crop {
  alias: string;
  width: number;
  height: number;
  coordinates?: Coordinates;
}

export interface ImageCropperValue {
  focalPoint?: FocalPoint | null;
  crops?: Crop[];
  id: string;
  name: string;
  mediaType: string;
  url: string;
  extension: string;
  width: number;
  height: number;
  bytes: number;
  properties: Record<string, unknown>;
}
