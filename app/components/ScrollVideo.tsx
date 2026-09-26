"use client";

import { useEffect, useRef } from "react";

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let animationFrame = 0;
    let settleTimer = 0;
    let targetTime = 0;
    let hasMetadata = false;
    let lastAssignedTime = -1;
    let previousFrameTime = 0;

    const getTargetTime = () => {
      if (!hasMetadata || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      const scrollDistance = section.offsetHeight - window.innerHeight;
      const progress = scrollDistance > 0
        ? Math.max(0, Math.min(1, -section.getBoundingClientRect().top / scrollDistance))
        : 0;
      targetTime = progress * video.duration;

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      animationFrame = 0;
      if (!hasMetadata || !Number.isFinite(video.duration) || video.duration <= 0) return;

      const now = performance.now();
      const elapsed = previousFrameTime ? Math.min(now - previousFrameTime, 50) : 16.7;
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

      // Time-based easing keeps the response consistent across refresh rates.
      const easing = 1 - Math.exp(-elapsed / 65);
      const nextTime = currentTime + difference * easing;
      if (Number.isFinite(nextTime) && Math.abs(nextTime - currentTime) >= 0.001) {
        video.currentTime = nextTime;
        lastAssignedTime = nextTime;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      getTargetTime();
      window.clearTimeout(settleTimer);
      // Once scrolling stops, land on the precise frame represented by scroll position.
      settleTimer = window.setTimeout(() => {
        if (hasMetadata && Number.isFinite(targetTime) && Math.abs(video.currentTime - targetTime) >= 0.001) {
          video.currentTime = targetTime;
          lastAssignedTime = targetTime;
        }
      }, 120);
    };

    const handleMetadata = () => {
      hasMetadata = true;
      getTargetTime();
    };

    const handleError = () => {
      hasMetadata = false;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    video.addEventListener("loadedmetadata", handleMetadata);
    video.addEventListener("error", handleError);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) handleMetadata();
    handleScroll();

    return () => {
      video.removeEventListener("loadedmetadata", handleMetadata);
      video.removeEventListener("error", handleError);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.clearTimeout(settleTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/tamil-hero_gwr_video_mvp%20(1).mp4"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
