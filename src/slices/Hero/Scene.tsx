"use client";
import FloatingCan from "@/components/FloatingCan";
import { useGSAP } from "@gsap/react";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef } from "react";
import { Group } from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/hooks/store";
type Props = {};
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);
  const can1ref = useRef<Group>(null);
  const can2ref = useRef<Group>(null);
  const can3ref = useRef<Group>(null);
  const can4ref = useRef<Group>(null);
  const can5ref = useRef<Group>(null);
  // extra anime in the frobnt page
  const can1GrpRf = useRef<Group>(null);
  const can2GrpRf = useRef<Group>(null);

  const grpRef = useRef<Group>(null);
  useGSAP(() => {
    if (
      !can1ref.current ||
      !can2ref.current ||
      !can3ref.current ||
      !can4ref.current ||
      !can5ref.current ||
      !can1GrpRf.current ||
      !can2GrpRf.current ||
      !grpRef.current
    )
      return;
    isReady();

    // set and animate
    gsap.set(can1ref.current.position, { x: -1.5 });
    gsap.set(can1ref.current.rotation, { z: -0.5 });
    gsap.set(can2ref.current.position, { x: 1.5 });
    gsap.set(can2ref.current.rotation, { z: 0.5 });
    gsap.set(can3ref.current.position, { y: 5, z: 2 });
    gsap.set(can4ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5ref.current.position, { y: -5 });
    const introtl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1.4)",
      },
    });
    if (window.scrollY < 20) {
      introtl
        .from(can1GrpRf.current.position, { y: -5, x: 1 }, 0) // all aniations at same time set to 0
        .from(can1GrpRf.current.rotation, { z: 3 }, 0)
        .from(can2GrpRf.current.position, { y: 5, x: 1 }, 0)
        .from(can2GrpRf.current.rotation, { z: 3 }, 0);
    }

    const scroltl = gsap.timeline({
      defaults: {
        duration: 2,
      },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });
    scroltl
      //rotate total grp
      .to(grpRef.current.rotation, { y: Math.PI * 2 })
      //can1
      .to(can1ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1ref.current.rotation, { z: 0.3 }, 0)
      //can2
      .to(can2ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2ref.current.rotation, { z: 0 }, 0)
      //can3
      .to(can3ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3ref.current.rotation, { z: -0.1 }, 0)

      //can4
      .to(can4ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4ref.current.rotation, { z: 0.3 }, 0)

      //can5
      .to(can5ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5ref.current.rotation, { z: -0.25 }, 0)

      .to(
        grpRef.current.position,
        {
          x: 1,
          duration: 3,
          ease: "sine.inOut",
        },
        1.3, // starts at 1.3
      );
  });

  const FLOAT_SPEED = 1.5;
  return (
    <group ref={grpRef}>
      <group ref={can1GrpRf}>
        <FloatingCan
          ref={can1ref}
          flavor="blackCherry"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <group ref={can2GrpRf}>
        <FloatingCan
          ref={can2ref}
          flavor="lemonLime"
          floatSpeed={FLOAT_SPEED}
        />
      </group>
      <FloatingCan ref={can3ref} flavor="grape" floatSpeed={FLOAT_SPEED} />
      <FloatingCan
        ref={can4ref}
        flavor="strawberryLemonade"
        floatSpeed={FLOAT_SPEED}
      />
      <FloatingCan ref={can5ref} flavor="watermelon" floatSpeed={FLOAT_SPEED} />

      {/*
    Environment from drei pretedning soda can in that environment

  */}
      <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}
