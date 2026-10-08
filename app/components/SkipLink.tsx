"use client";

import { useLanguage } from "../context/LanguageContext";

export default function SkipLink() {
  const { language, enterWebsite } = useLanguage();
  return <a className="skip-link" href="#main-site" onClick={enterWebsite}>{language === "ta" ? "உள்ளடக்கத்திற்குச் செல்லுங்கள்" : "Skip to content"}</a>;
}
