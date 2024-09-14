"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";

import { Environment, View } from "@react-three/drei";
import FloatingCan from "./FloatingCan";

type Props = {};

export default function ViewCanvas({}: Props) {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30, // in middle
      }}
      camera={{
        fov: 30,
      }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }} // no jagged lines
    >
      <View.Port />
    </Canvas>
  );
}
