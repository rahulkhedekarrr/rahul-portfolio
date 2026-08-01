"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import React, { useEffect } from "react";

function loadFeatures() {
  return import("framer-motion").then((mod) => mod.domAnimation);
}

type MotionProviderProps = {
  children: React.ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia("(max-width: 768px)").matches;

    // Skip Lenis on mobile / touch / reduced-motion to cut main-thread rAF cost
    if (prefersReduced || isCoarsePointer || isNarrow) return;

    let destroyed = false;
    let rafId = 0;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null =
      null;

    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      if (destroyed) return;

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        gestureOrientation: "vertical",
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
