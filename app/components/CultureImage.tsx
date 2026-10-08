"use client";

import { useState } from "react";
import Image from "next/image";
import type { Culture } from "../data/cultures";
import { useLanguage } from "../context/LanguageContext";
import { ui } from "../data/ui";

export default function CultureImage({ culture, className = "" }: { culture: Culture; className?: string }) {
  const [failed, setFailed] = useState(false);
  const { language } = useLanguage();
  const fallback = ui[language].imageUnavailable;
  if (failed || !culture.image) return <div className={`culture-image culture-image--missing ${className}`} role="img" aria-label={fallback}><span>{fallback}</span></div>;
  const sizes = className.includes("culture-story__image") ? "(max-width: 900px) 100vw, 55vw" : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 30vw";
  return <div className={`culture-image ${className}`}><Image src={culture.image} alt={language === "ta" ? culture.titleTa : culture.titleEn} fill sizes={sizes} onError={() => setFailed(true)} /></div>;
}
