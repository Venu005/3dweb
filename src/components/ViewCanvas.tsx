"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import { Environment, View } from "@react-three/drei";
import FloatingCan from "./FloatingCan";
import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  {
    ssr: false,
  },
);

type Props = {};

export default function ViewCanvas({}: Props) {
  return (
    <>
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
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
