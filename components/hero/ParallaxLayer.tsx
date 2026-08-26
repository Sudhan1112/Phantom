"use client";

import Image from "next/image";
import { motion, type MotionValue, useTransform } from "framer-motion";
import {
  LAYER_OBJECT_POSITION,
  LAYER_SCALE_START,
  PARALLAX_ENABLED,
  type ParallaxLayerConfig,
} from "./hero.config";
import { getDepthParallaxPx, getLayerScale } from "./layerMotion";

type ParallaxLayerProps = {
  layer: ParallaxLayerConfig;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
};

export function ParallaxLayer({
  layer,
  scrollYProgress,
  reduceMotion,
}: ParallaxLayerProps) {
  const animate = PARALLAX_ENABLED && !reduceMotion;

  const y = useTransform(scrollYProgress, (progress) =>
    animate ? getDepthParallaxPx(layer.depth, progress) : 0
  );

  const scale = useTransform(scrollYProgress, (progress) =>
    animate ? getLayerScale(progress) : LAYER_SCALE_START
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 will-change-transform"
      style={{
        zIndex: layer.zIndex,
        x: 0,
        y: animate ? y : 0,
        scale: animate ? scale : LAYER_SCALE_START,
        opacity: layer.opacity,
      }}
      aria-hidden="true"
    >
      <Image
        src={layer.src}
        alt=""
        fill
        priority={layer.priority}
        sizes="100vw"
        className="select-none object-fill"
        style={{ objectPosition: LAYER_OBJECT_POSITION }}
        draggable={false}
      />
    </motion.div>
  );
}
