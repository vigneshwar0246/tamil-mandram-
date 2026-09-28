"use client";

import { useEffect, useRef, useState } from "react";
import { scenes } from "../data/scenes";
import { useLanguage } from "../context/LanguageContext";

export default function ScrollVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language, toggleLanguage, entered, enterWebsite } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [overlayTone, setOverlayTone] = useState<"light" | "dark">("light");

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    let frame = 0;
    const update = () => {
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const next = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / distance));
      setProgress(next);
      if (video.duration && Number.isFinite(video.duration)) video.currentTime = next * video.duration;
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    video.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { video.removeEventListener("loadedmetadata", update); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const scene = scenes.find((item) => progress >= item.start && progress < item.end) ?? scenes[scenes.length - 1];
  const copy = language === "ta" ? scene.ta : scene.en;
  const arrived = progress > 0.82;
  const overlayVisible = !arrived && progress > 0.04;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !overlayVisible || video.readyState < 2) return;
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
  }, [progress, overlayVisible, scene.align]);

  useEffect(() => {
    if (!arrived || entered) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [arrived, entered]);

  const handleEnterWebsite = () => {
    const target = sectionRef.current ? sectionRef.current.offsetTop + sectionRef.current.offsetHeight - window.innerHeight : 0;
    document.body.style.overflow = "";
    enterWebsite();
    window.requestAnimationFrame(() => window.scrollTo({ top: target, behavior: "smooth" }));
  };

  return <section ref={sectionRef} className="cinematic-journey">
    <div className="sticky top-0 h-dvh w-full overflow-hidden bg-black">
      <video ref={videoRef} src="/videos/tamil-hero_gwr_video_mvp (1).mp4" muted playsInline preload="auto" tabIndex={-1} aria-hidden="true" className="cinematic-video h-full w-full object-cover" />
      <div className="cinematic-intro" style={{ opacity: progress < 0.1 ? 1 - progress * 8 : 0 }}><div className="cinematic-intro__content"><p className="cinematic-intro__eyebrow">TAMIL MANDRAM</p><h1 className="cinematic-intro__title"><span>ENTER THE</span><span>SOUL OF</span><span>TAMIL</span><span>CULTURE</span></h1><p className="cinematic-intro__tamil">தமிழ் பண்பாட்டின் ஆன்மாவுக்குள்<br />ஒரு பயணம்</p><p className="cinematic-intro__description">Preserving culture through digital innovation</p><p className="cinematic-intro__scroll-cue">{language === "ta" ? "கீழே பயணிக்கவும்" : "SCROLL TO BEGIN"}<span>↓</span></p></div></div>
      <div className="cloud-scene" style={{ opacity: arrived ? Math.min(1, (progress - 0.82) * 8) : 0 }} aria-hidden="true"><div className="cloud cloud--distant" /><div className="cloud cloud--left" /><div className="cloud cloud--right" /><div className="cloud cloud--foreground" /><div className="cloud-veil" /><div className="cloud-light-rays" /></div>
      <div className={`scene-overlay scene-overlay--${scene.align} scene-overlay--${overlayTone}`} style={{ opacity: overlayVisible ? 1 : 0, transform: `translateY(${overlayVisible ? 0 : 1.5}rem)` }}><p className="scene-overlay__chapter">{scene.chapter} — {copy[0]}</p><h2>{copy[1]}</h2><p>{copy[2]}</p></div>
      {!entered && <div className="arrival-screen" style={{ opacity: arrived ? 1 : 0, pointerEvents: arrived ? "auto" : "none" }}><button className="cinematic-language" onClick={toggleLanguage}>{language === "en" ? "தமிழ்" : "EN"}</button><p className="arrival-screen__brand">TAMILHERITAGE</p><h2>{language === "ta" ? "தமிழ் பண்பாட்டிற்குள் நுழையுங்கள்" : "Enter Tamil culture"}</h2><p>{language === "ta" ? "கதைகள், கலைகள், இடங்கள் மற்றும் வாழும் மரபுகளை ஆராயுங்கள்." : "Explore stories, arts, places and living traditions."}</p><button className="arrival-screen__enter" onClick={handleEnterWebsite}>{language === "ta" ? "ஆராய நுழையுங்கள்" : "ENTER TO EXPLORE"} ↗</button></div>}
      <button className="cinematic-language" style={{ opacity: arrived ? 0 : 1, pointerEvents: arrived ? "none" : "auto" }} onClick={toggleLanguage} aria-label="Switch language">{language === "en" ? "தமிழ்" : "EN"}</button>
      <div className="chapter-indicator" aria-hidden="true"><span>{scene.chapter}</span><i /></div>
    </div>
  </section>;
}
