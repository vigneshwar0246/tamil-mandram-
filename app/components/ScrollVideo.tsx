"use client";

import { useEffect, useRef } from "react";

// Keep the original video scrub exactly three viewport-heights long. The extra
// scroll distance is reserved for the entry and the final temple-to-site handoff.
const INTRO_SCROLL_VH = 1;
const VIDEO_SCROLL_VH = 3;
const TEMPLE_HOLD_VH = 0.65;
const CLOUD_SCROLL_VH = 1.35;
const TOTAL_SCROLL_VH =
  INTRO_SCROLL_VH + VIDEO_SCROLL_VH + TEMPLE_HOLD_VH + CLOUD_SCROLL_VH;
const FINAL_FRAME_OFFSET = 0.04;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const smoothStep = (value: number, start: number, end: number) => {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
};

const setLayer = (
  element: HTMLDivElement | null,
  opacity: number,
  transform: string,
) => {
  if (!element) return;

  element.style.opacity = String(clamp(opacity));
  element.style.transform = transform;
};

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const cloudSceneRef = useRef<HTMLDivElement>(null);
  const distantCloudRef = useRef<HTMLDivElement>(null);
  const leftCloudRef = useRef<HTMLDivElement>(null);
  const rightCloudRef = useRef<HTMLDivElement>(null);
  const foregroundCloudRef = useRef<HTMLDivElement>(null);
  const veilCloudRef = useRef<HTMLDivElement>(null);
  const lightRaysRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let seekAnimationFrame = 0;
    let paintAnimationFrame = 0;
    let settleTimer: number | undefined;
    let targetTime = 0;
    let hasMetadata = false;
    let lastAssignedTime = -1;
    let previousFrameTime = 0;

    const getFinalFrameTime = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;

      // Seeking to `duration` can render black on some browsers. This remains
      // the same final temple shot, just inside the last decodable frame.
      return Math.max(
        0,
        video.duration - Math.min(FINAL_FRAME_OFFSET, video.duration / 1000),
      );
    };

    const getJourneyProgress = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);
      return clamp(
        -section.getBoundingClientRect().top / viewportHeight,
        0,
        TOTAL_SCROLL_VH,
      );
    };

    const animateVideo = () => {
      seekAnimationFrame = 0;

      if (!hasMetadata || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      const now = performance.now();
      const elapsed = previousFrameTime
        ? Math.min(now - previousFrameTime, 50)
        : 16.7;
      previousFrameTime = now;

      const currentTime = Number.isFinite(video.currentTime) ? video.currentTime : 0;
      const difference = targetTime - currentTime;

      if (Math.abs(difference) < 0.015) {
        if (Math.abs(targetTime - lastAssignedTime) >= 0.001) {
          video.currentTime = targetTime;
          lastAssignedTime = targetTime;
        }
        return;
      }

      // Time-based easing keeps the original scrub response consistent across
      // refresh rates while the clouds and intro are painted independently.
      const easing = 1 - Math.exp(-elapsed / 65);
      const nextTime = currentTime + difference * easing;

      if (Number.isFinite(nextTime) && Math.abs(nextTime - currentTime) >= 0.001) {
        video.currentTime = nextTime;
        lastAssignedTime = nextTime;
      }

      seekAnimationFrame = requestAnimationFrame(animateVideo);
    };

    const scheduleVideoAnimation = () => {
      if (!seekAnimationFrame && hasMetadata) {
        seekAnimationFrame = requestAnimationFrame(animateVideo);
      }
    };

    const paintScene = () => {
      const journey = getJourneyProgress();
      const introProgress = clamp(journey / INTRO_SCROLL_VH);
      const videoProgress = clamp(
        (journey - INTRO_SCROLL_VH) / VIDEO_SCROLL_VH,
      );
      const cloudProgress = clamp(
        (journey - INTRO_SCROLL_VH - VIDEO_SCROLL_VH - TEMPLE_HOLD_VH) /
          CLOUD_SCROLL_VH,
      );

      const introFade = 1 - smoothStep(introProgress, 0.06, 0.9);
      if (introRef.current) {
        introRef.current.style.opacity = String(introFade);
      }
      if (introContentRef.current) {
        introContentRef.current.style.opacity = String(
          1 - smoothStep(introProgress, 0.02, 0.78),
        );
        introContentRef.current.style.transform = `translate3d(0, ${
          -introProgress * 5
        }vh, 0) scale(${1 - introProgress * 0.018})`;
      }

      const cloudEntrance = smoothStep(cloudProgress, 0, 0.45);
      const cloudCoverage = smoothStep(cloudProgress, 0.22, 0.73);
      const cloudClearing = smoothStep(cloudProgress, 0.8, 1);
      const templeCovered = smoothStep(cloudProgress, 0.42, 0.68);

      if (cloudSceneRef.current) {
        cloudSceneRef.current.style.opacity = String(
          cloudEntrance * (1 - cloudClearing),
        );
      }

      setLayer(
        distantCloudRef.current,
        0.72 * cloudEntrance,
        `translate3d(0, ${-16 + cloudEntrance * 20}%, 0) scale(${0.9 +
          cloudCoverage * 0.2})`,
      );
      setLayer(
        leftCloudRef.current,
        0.88 * smoothStep(cloudProgress, 0.06, 0.6),
        `translate3d(${-70 + cloudEntrance * 73}%, ${12 -
          cloudCoverage * 28}%, 0) scale(${0.78 + cloudCoverage * 0.55})`,
      );
      setLayer(
        rightCloudRef.current,
        0.84 * smoothStep(cloudProgress, 0.11, 0.66),
        `translate3d(${72 - cloudEntrance * 76}%, ${-6 +
          cloudCoverage * 22}%, 0) scale(${0.8 + cloudCoverage * 0.5})`,
      );
      setLayer(
        foregroundCloudRef.current,
        0.95 * cloudCoverage,
        `translate3d(0, ${58 - cloudCoverage * 70}%, 0) scale(${0.72 +
          cloudCoverage * 0.9})`,
      );
      setLayer(
        veilCloudRef.current,
        0.38 * cloudEntrance + 0.58 * cloudCoverage,
        `translate3d(0, ${28 - cloudCoverage * 24}%, 0) scale(${0.85 +
          cloudCoverage * 0.45})`,
      );
      setLayer(
        lightRaysRef.current,
        0.42 * cloudEntrance * (1 - cloudClearing),
        `translate3d(${8 - cloudCoverage * 18}%, ${-10 +
          cloudCoverage * 25}%, 0) scale(${0.92 + cloudCoverage * 0.32})`,
      );

      // The video never swaps assets here. It stays on its final temple state
      // while the mist grows over it, then becomes transparent only after the
      // clouds have fully obscured that same image.
      video.style.opacity = String(1 - templeCovered);
      video.style.transform = `scale(${1 + cloudCoverage * 0.045})`;

      if (hasMetadata) {
        const finalFrameTime = getFinalFrameTime();
        targetTime =
          videoProgress >= 1 ? finalFrameTime : videoProgress * finalFrameTime;
        scheduleVideoAnimation();
      }
    };

    const requestPaint = () => {
      if (paintAnimationFrame) return;

      paintAnimationFrame = requestAnimationFrame(() => {
        paintAnimationFrame = 0;
        paintScene();
      });
    };

    const handleScroll = () => {
      requestPaint();
      if (settleTimer) window.clearTimeout(settleTimer);

      // Once scrolling stops, land on the exact frame represented by its place
      // in the cultural film, including the held final temple frame.
      settleTimer = window.setTimeout(() => {
        paintScene();
        if (
          hasMetadata &&
          Number.isFinite(targetTime) &&
          Math.abs(video.currentTime - targetTime) >= 0.001
        ) {
          video.currentTime = targetTime;
          lastAssignedTime = targetTime;
        }
      }, 120);
    };

    const handleMetadata = () => {
      hasMetadata = true;
      video.pause();
      requestPaint();
    };

    const handleError = () => {
      hasMetadata = false;
      if (seekAnimationFrame) {
        cancelAnimationFrame(seekAnimationFrame);
        seekAnimationFrame = 0;
      }
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("error", handleError);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata();
    requestPaint();

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (seekAnimationFrame) cancelAnimationFrame(seekAnimationFrame);
      if (paintAnimationFrame) cancelAnimationFrame(paintAnimationFrame);
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cinematic-journey relative z-10">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-black pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/tamil-hero_gwr_video_mvp%20(1).mp4"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          className="cinematic-video h-full w-full object-cover"
        />

        <div ref={cloudSceneRef} className="cloud-scene" aria-hidden="true">
          <div ref={distantCloudRef} className="cloud cloud--distant" />
          <div ref={leftCloudRef} className="cloud cloud--left" />
          <div ref={rightCloudRef} className="cloud cloud--right" />
          <div ref={foregroundCloudRef} className="cloud cloud--foreground" />
          <div ref={veilCloudRef} className="cloud-veil" />
          <div ref={lightRaysRef} className="cloud-light-rays" />
        </div>

        <div ref={introRef} className="cinematic-intro">
          <div ref={introContentRef} className="cinematic-intro__content">
            <p className="cinematic-intro__eyebrow">TAMIL MANDRAM</p>
            <h1 className="cinematic-intro__title">
              <span>ENTER THE SOUL OF</span>
              <span>TAMIL CULTURE</span>
            </h1>
            <p className="cinematic-intro__tamil" lang="ta">
              தமிழ் பண்பாட்டின் ஆன்மாவுக்குள்
              <br />
              ஒரு பயணம்
            </p>
            <p className="cinematic-intro__scroll-cue">
              <span>SCROLL TO BEGIN</span>
              <span aria-hidden="true">↓</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
