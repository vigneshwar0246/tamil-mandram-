"use client";

import { useState } from "react";
import { cultures, type Culture } from "../data/cultures";
import { useLanguage } from "../context/LanguageContext";

const navItems = [
  ["HOME", "முகப்பு", "main-site"], ["HERITAGE", "மரபு", "culture"], ["CULTURE", "பண்பாடு", "culture"],
  ["ARCHITECTURE", "கட்டிடக்கலை", "architecture"], ["ARTS", "கலைகள்", "dance"], ["TRADITIONS", "மரபுகள்", "traditions"],
  ["LANGUAGE", "மொழி", "language"], ["ABOUT", "பற்றி", "preservation"],
] as const;

function CultureImage({ culture, className = "" }: { culture: Culture; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !culture.image) return <div className={`culture-image culture-image--missing ${className}`} aria-label="Image unavailable"><span>IMAGE UNAVAILABLE</span></div>;
  return <div className={`culture-image ${className}`}><img src={culture.image} alt={culture.titleEn} onError={() => setFailed(true)} /></div>;
}

export default function SiteContent() {
  const { language, toggleLanguage, entered } = useLanguage();
  const tamil = language === "ta";
  const title = (culture: Culture) => tamil ? culture.titleTa : culture.titleEn;
  const description = (culture: Culture) => tamil ? culture.descriptionTa : culture.descriptionEn;

  return <div className={`static-website ${entered ? "static-website--entered" : ""}`}>
    <section id="main-site" className="website-arrival">
      <nav className="website-nav" aria-label="Main navigation">
        <a className="website-nav__brand" href="#main-site">{tamil ? "தமிழ் மன்றம்" : "TAMIL MANDRAM"}</a>
        <div className="website-nav__links">{navItems.map(([en, ta, id]) => <a key={`${id}-${en}`} href={`#${id}`}>{tamil ? ta : en}</a>)}</div>
        <button className="language-switcher" onClick={toggleLanguage} aria-label="Switch language">{tamil ? "EN" : "தமிழ்"}</button>
      </nav>
      <div className="website-arrival__content">
        <p className="website-kicker">{tamil ? "தமிழ் மன்றம்" : "TAMIL MANDRAM"}</p>
        <h1>{tamil ? "தமிழ் பண்பாட்டை ஆராயுங்கள்" : "EXPLORE TAMIL CULTURE"}</h1>
        <p className="website-arrival__lede">{tamil ? "தமிழ் மொழி, கட்டிடக்கலை, கலைகள், திருவிழாக்கள், உணவு, மரபுகள் மற்றும் வாழும் பண்பாட்டை ஒருங்கிணைந்த டிஜிட்டல் அனுபவத்தின் மூலம் அறிந்துகொள்ளுங்கள்." : "Discover Tamil language, architecture, arts, festivals, food, traditions and living heritage through an immersive digital experience."}</p>
        <a className="hero-primary" href="#culture">{tamil ? "பண்பாட்டை ஆராயுங்கள்" : "EXPLORE CULTURE"} <span>↘</span></a>
      </div>
    </section>

    <section id="culture" className="culture-section">
      <div className="section-heading"><div><p className="website-kicker">{tamil ? "பல உலகங்கள் · ஒரு வாழும் பண்பாடு" : "MANY WORLDS · ONE LIVING CULTURE"}</p><h2>{tamil ? "தமிழ் பண்பாட்டின் வாசல்கள்" : "A living culture, in twelve worlds"}</h2></div><p>{tamil ? "மொழி, இடம், சமூகம், கற்பனை ஆகியவற்றை இணைக்கும் கதைகளைத் தேர்ந்தெடுக்கவும்." : "Choose a thread and follow the stories that connect knowledge, place, community and imagination."}</p></div>
      <div className="culture-grid">{cultures.map((culture, index) => <a href={`#${culture.id}`} className={`culture-card ${index < 2 ? "culture-card--featured" : ""}`} key={culture.id}>
        <CultureImage culture={culture} /><div className="culture-card__body"><span className="culture-number">{culture.number}</span><h3>{title(culture)}</h3><p>{description(culture)}</p><b>{tamil ? "ஆராயுங்கள்" : "Explore"} <span>↗</span></b></div>
      </a>)}</div>
    </section>

    <section className="heritage-gallery" aria-label="Visual heritage gallery"><div className="section-heading"><div><p className="website-kicker">{tamil ? "காட்சியாகும் மரபு" : "A DIGITAL WINDOW INTO TAMIL CULTURE"}</p><h2>{tamil ? "பார்த்து, நினைத்து, தொடருங்கள்" : "Look closer"}</h2></div><p>{tamil ? "ஒவ்வொரு படமும் ஒரு பெரிய வாழும் கதையின் திறந்த வாசல்." : "Each image is an open doorway into a larger living story."}</p></div><div className="gallery-grid">{cultures.map((culture) => <a href={`#${culture.id}`} key={culture.id}><CultureImage culture={culture} /><span>{culture.number}</span><h3>{title(culture)}</h3></a>)}</div></section>

    <section id="traditions" className="traditions-band"><p className="website-kicker">{tamil ? "வாழும் மரபுகள்" : "LIVING TRADITIONS"}</p><h2>{tamil ? "கடந்த காலம் இன்றைய வாழ்வில் தொடர்கிறது." : "The past is still moving through the present."}</h2></section>

    <div className="story-sections">{cultures.map((culture, index) => <article id={culture.id} className={`culture-story culture-story--${index % 3}`} key={culture.id}>
      <CultureImage culture={culture} className="culture-story__image" />
      <div className="culture-story__copy"><p className="website-kicker">{culture.number} · {tamil ? "பண்பாட்டு கதை" : "CULTURAL STORY"}</p><h2>{title(culture)}</h2><p className="culture-story__intro">{description(culture)}</p><p>{tamil ? culture.detailTa : culture.detailEn}</p><p className="culture-story__significance"><strong>{tamil ? "கலாச்சார முக்கியத்துவம்" : "CULTURAL SIGNIFICANCE"}</strong>{tamil ? culture.significanceTa : culture.significanceEn}</p><div className="related-cultures"><strong>{tamil ? "தொடர்புடைய பண்பாடுகள்" : "RELATED CULTURES"}</strong>{culture.related.map((id) => { const related = cultures.find((item) => item.id === id); return related ? <a href={`#${id}`} key={id}>{title(related)} ↗</a> : null; })}</div><div className="story-pagination"><a href={`#${cultures[(index + cultures.length - 1) % cultures.length].id}`}>← {tamil ? "முந்தைய பண்பாடு" : "Previous Culture"}</a><a href={`#${cultures[(index + 1) % cultures.length].id}`}>{tamil ? "அடுத்த பண்பாடு" : "Next Culture"} →</a></div></div>
    </article>)}</div>

    <section id="preservation" className="preservation-section"><div><p className="website-kicker">{tamil ? "தமிழ்மரபு · டிஜிட்டல் புத்தாக்கம்" : "TAMILHERITAGE · DIGITAL INNOVATION"}</p><h2>{tamil ? "டிஜிட்டல் புத்தாக்கத்தின் மூலம் கலாச்சாரத்தைப் பாதுகாத்தல்" : "PRESERVING CULTURE THROUGH DIGITAL INNOVATION"}</h2></div><div><p>{tamil ? "ஆவணப்படுத்தல், அணுகல், டிஜிட்டல் கதைசொல்லல், இளைய தலைமுறை, பண்பாட்டுத் தொடர்ச்சி, காட்சித் தேடல் ஆகியவை மரபை எதிர்காலத்தோடு இணைக்கின்றன." : "Documentation, accessibility, digital storytelling, the young generation, cultural continuity and visual discovery can keep heritage open to the future."}</p><a href="#culture">{tamil ? "பயணத்தைத் தொடருங்கள்" : "Continue exploring"} ↗</a></div></section>

    <footer className="site-footer"><div><strong>{tamil ? "தமிழ் மன்றம்" : "TAMIL MANDRAM"}</strong><p>{tamil ? "டிஜிட்டல் புத்தாக்கம் மூலம் தமிழ் மரபைப் பாதுகாத்தல்." : "TamilHeritage: Preserving culture through digital innovation."}</p></div><div className="footer-links"><a href="#culture">{tamil ? "பண்பாடு" : "Explore Culture"}</a><a href="#language">{tamil ? "மொழி" : "Language"}</a><a href="#architecture">{tamil ? "கட்டிடக்கலை" : "Architecture"}</a><a href="#preservation">{tamil ? "பற்றி" : "About"}</a></div><button onClick={toggleLanguage}>{tamil ? "EN" : "தமிழ்"}</button></footer>
  </div>;
}
