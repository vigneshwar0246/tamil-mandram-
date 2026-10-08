"use client";

import { useEffect, useRef, useState } from "react";
import { cinematicTimeline, scenes } from "../data/scenes";
import { useLanguage } from "../context/LanguageContext";
import { ui } from "../data/ui";

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language, toggleLanguage, entered, enterWebsite } = useLanguage();
  const copyUI = ui[language];
  const [progress, setProgress] = useState(0);
  const [overlayTone, setOverlayTone] = useState<"light" | "dark">("light");
  const lastSeek = useRef(0);
  const lastRendered = useRef(0);
  const lastSample = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    let frame = 0;
    const update = () => {
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const next = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        frame = 0;
        return;
      }
      if (video.duration && Number.isFinite(video.duration)) {
        const target = next * video.duration;
        const now = performance.now();
        if (Math.abs(video.currentTime - target) > 0.08 && now - lastSeek.current > 70) {
          video.currentTime = target;
          lastSeek.current = now;
        }
        if (Math.abs(next - lastRendered.current) > 0.002 || next === 0 || next === 1) {
          lastRendered.current = next;
          setProgress(next);
        }
      } else {
        setProgress(0);
      }
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    video.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { video.removeEventListener("loadedmetadata", update); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const scene = scenes.find((item) => progress >= item.start && progress < item.end);
  const copy = scene ? (language === "ta" ? scene.ta : scene.en) : null;
  const arrived = progress >= cinematicTimeline.arrivalStart;
  const introVisible = progress < cinematicTimeline.introEnd;
  const overlayVisible = Boolean(scene) && !arrived;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !overlayVisible || video.readyState < 2 || performance.now() - lastSample.current < 250) return;
    lastSample.current = performance.now();
    const canvas = document.createElement("canvas");
    canvas.width = 48;
    canvas.height = 27;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const sampleFrame = () => {
      try {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const pixels = context.getImageData(0, 12, canvas.width, 15).data;
        let brightness = 0;
        let samples = 0;
        for (let index = 0; index < pixels.length; index += 16) {
          brightness += (pixels[index] * 0.299) + (pixels[index + 1] * 0.587) + (pixels[index + 2] * 0.114);
          samples += 1;
        }
        setOverlayTone(brightness / samples > 150 ? "dark" : "light");
      } catch {
        setOverlayTone("light");
      }
    };

    const frame = window.requestAnimationFrame(sampleFrame);
    return () => window.cancelAnimationFrame(frame);
  }, [progress, overlayVisible, scene?.align]);

  const handleEnterWebsite = () => {
    const target = sectionRef.current ? sectionRef.current.offsetTop + sectionRef.current.offsetHeight - window.innerHeight : 0;
    enterWebsite();
    window.requestAnimationFrame(() => window.scrollTo({ top: target, behavior: "auto" }));
  };

  return <section ref={sectionRef} className="cinematic-journey">
    <div className="sticky top-0 h-dvh w-full overflow-hidden bg-black">
      <video ref={videoRef} src="/videos/tamil-hero_gwr_video_mvp (1).mp4" muted playsInline preload="metadata" tabIndex={-1} aria-hidden="true" className="cinematic-video h-full w-full object-cover" />
      <div className="cinematic-intro" style={{ opacity: introVisible ? 1 : 0, pointerEvents: introVisible ? "auto" : "none" }}><div className="cinematic-intro__content"><p className="cinematic-intro__eyebrow">{copyUI.brand}</p><div className="cinematic-intro__title">{copyUI.introLines.map((line) => <span key={line}>{line}</span>)}</div>{language === "en" && <p className="cinematic-intro__tamil" lang="ta">தமிழ் பண்பாட்டின் ஆன்மாவுக்குள்<br />ஒரு பயணம்</p>}<p className="cinematic-intro__description">{copyUI.introDescription}</p><p className="cinematic-intro__scroll-cue">{copyUI.scrollCue}<span>↓</span></p></div></div>
      <div className="cloud-scene" style={{ opacity: arrived ? Math.min(1, (progress - 0.82) * 8) : 0 }} aria-hidden="true"><div className="cloud cloud--distant" /><div className="cloud cloud--left" /><div className="cloud cloud--right" /><div className="cloud cloud--foreground" /><div className="cloud-veil" /><div className="cloud-light-rays" /></div>
      {scene && copy && <div className={`scene-overlay scene-overlay--${scene.align} scene-overlay--${overlayTone}`} style={{ opacity: overlayVisible ? 1 : 0, transform: `translateY(${overlayVisible ? 0 : 1.5}rem)` }}><p className="scene-overlay__chapter">{scene.chapter} — {copy[0]}</p><h2>{copy[1]}</h2><p>{copy[2]}</p></div>}
      {!entered && <div className="arrival-screen" inert={!arrived} style={{ opacity: arrived ? 1 : 0, pointerEvents: arrived ? "auto" : "none" }}><button className="cinematic-language" onClick={toggleLanguage} aria-label={copyUI.switchLanguage}>{language === "en" ? "தமிழ்" : "EN"}</button><p className="arrival-screen__brand">{copyUI.brand}</p><h2>{copyUI.arrivalTitle}</h2><p>{copyUI.arrivalDescription}</p><button className="arrival-screen__enter" onClick={handleEnterWebsite}>{copyUI.enter} ↗</button></div>}
      <button className="cinematic-language" style={{ opacity: arrived ? 0 : 1, pointerEvents: arrived ? "none" : "auto" }} onClick={toggleLanguage} aria-label={copyUI.switchLanguage}>{language === "en" ? "தமிழ்" : "EN"}</button>
      {!entered && <a className="skip-intro" href="#main-site" onClick={enterWebsite}>{copyUI.skipIntro} ↗</a>}
      <div className="chapter-indicator" aria-hidden="true"><span>{scene?.chapter ?? ""}</span><i /></div>
    </div>
  </section>;
}
