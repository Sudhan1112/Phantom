export type ParallaxLayerConfig = {
  id: string;
  src: string;
  depth: number;
  opacity: number;
  zIndex: number;
  priority?: boolean;
  label: string;
};

export const PARALLAX_ENABLED = true;

export const LAYER_OBJECT_POSITION = "center center" as const;
export const LAYER_SCALE_START = 1;
export const LAYER_SCALE_END = 1.04;
export const PARALLAX_RANGE_PX = 180;
/** Extra vh is for cinematic phases (entrance → wow → settle), not empty scroll. */
export const HERO_TRACK_VH = 360;

export const PARALLAX_LAYERS: ParallaxLayerConfig[] = [
  {
    id: "sky",
    src: "/images/parallax/sky-layer.webp",
    depth: 0.0,
    opacity: 1,
    zIndex: 0,
    priority: true,
    label: "Sky",
  },
  {
    id: "clouds",
    src: "/images/parallax/cloud-layer.webp",
    depth: 0.12,
    opacity: 1,
    zIndex: 10,
    label: "Clouds",
  },
  {
    id: "foreground",
    src: "/images/parallax/foreground-layer.webp",
    depth: 0.42,
    opacity: 1,
    zIndex: 50,
    label: "Foreground",
  },
];
