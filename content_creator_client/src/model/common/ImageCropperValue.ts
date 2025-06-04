/**
 * Represents the value structure of Umbraco's Image Cropper property editor.
 * This is a minimal version; extend as needed for your use case.
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
  src: string;
  focalPoint?: FocalPoint;
  crops?: Crop[];
}
