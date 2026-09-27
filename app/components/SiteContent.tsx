"use client";

import { translations } from "../data/translations";
import { useLanguage } from "../context/LanguageContext";

const ids = ["heritage", "culture", "arts", "temples", "traditions", "language", "about"];

export default function SiteContent() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [overview, culture, architecture, digital, finale] = t.sections;

  return <>
    <section id="main-site" className="website-arrival">
      <nav className="website-nav" aria-label="Main navigation">
        <a className="website-nav__brand" href="#main-site">TAMIL MANDRAM</a>
        <div className="website-nav__links">{t.nav.map((label, index) => <a key={ids[index]} href={`#${ids[index]}`}>{label}</a>)}</div>
        <button className="language-switcher" onClick={toggleLanguage} aria-label="Switch language">{language === "en" ? "தமிழ்" : "EN"}</button>
      </nav>
      <div className="website-arrival__content">
        <p className="website-kicker">{language === "en" ? "TAMIL்மரபு" : "TAMIL HERITAGE"}</p>
        <h1>{t.hero[0]}</h1><p className="website-arrival__lede">{t.hero[1]}</p>
        <p className="website-arrival__tamil">{language === "en" ? "தமிழ்மரபு: டிஜிட்டல் புதுமை மூலம் பண்பாட்டைப் பாதுகாத்தல்" : "TamilHeritage: Preserving culture through digital innovation"}</p>
        <p className="hero-description">{t.hero[2]}</p>
        <div className="hero-actions"><a href="#heritage">{t.hero[3]}</a><a href="#culture">{t.hero[4]}</a></div>
      </div>
    </section>
    <section id="heritage" className="site-content-section editorial-section"><div><p className="website-kicker">{overview[0]}</p><h2>{overview[1]}</h2></div><p className="site-content-section__copy">{overview[2]}</p></section>
    <section id="culture" className="culture-section"><p className="website-kicker">{culture[0]}</p><h2>{culture[1]}</h2><p>{culture[2]}</p><div className="culture-grid">{t.cards.map((card, index) => <a href={`#${index % 2 ? "temples" : "arts"}`} className="culture-card" key={card}><span>0{index + 1}</span><h3>{card}</h3><b>{t.explore} ↗</b></a>)}</div></section>
    <section id="temples" className="feature-section feature-section--temple"><div><p className="website-kicker">{architecture[0]}</p><h2>{architecture[1]}</h2><p>{architecture[2]}</p></div><div className="feature-visual" aria-hidden="true"><span>✦</span></div></section>
    <section id="arts" className="site-content-section site-content-section--dark"><div><p className="website-kicker">{language === "en" ? "ARTS & PERFORMANCE" : "கலைகளும் நிகழ்கலையும்"}</p><h2>{language === "en" ? "Stories in motion" : "அசைவில் வாழும் கதைகள்"}</h2></div><p className="site-content-section__copy">{language === "en" ? "Bharatanatyam, folk dance, music and theatre make memory visible, shared and felt." : "பரதநாட்டியம், நாட்டுப்புற நடனம், இசை, நாடகம் ஆகியவை நினைவைக் காட்சியாகவும் உணர்வாகவும் மாற்றுகின்றன."}</p></section>
    <section id="traditions" className="site-content-section"><div><p className="website-kicker">{language === "en" ? "LIVING TRADITIONS" : "வாழும் பாரம்பரியங்கள்"}</p><h2>{language === "en" ? "Culture in community" : "சமூகத்தில் பண்பாடு"}</h2></div><p className="site-content-section__copy">{language === "en" ? "Food, festivals, occupations and rural life keep heritage active in the rhythms of the present." : "உணவு, திருவிழா, தொழில், கிராமிய வாழ்வு ஆகியவை மரபை இன்றைய வாழ்வில் தொடரச் செய்கின்றன."}</p></section>
    <section id="language" className="site-content-section site-content-section--dark"><div><p className="website-kicker">{language === "en" ? "LANGUAGE & LITERATURE" : "மொழியும் இலக்கியமும்"}</p><h2>{language === "en" ? "A classical voice, still speaking" : "இன்னும் ஒலிக்கும் செம்மொழி"}</h2></div><p className="site-content-section__copy">{language === "en" ? "Poetry, proverbs, oral traditions and written works carry Tamil thought across time." : "கவிதை, பழமொழி, வாய்மொழி மரபு, எழுத்து இலக்கியம் ஆகியவை தமிழ் சிந்தனையை காலம் தாண்டி சுமக்கின்றன."}</p></section>
    <section id="about" className="site-content-section"><div><p className="website-kicker">{digital[0]}</p><h2>{digital[1]}</h2></div><p className="site-content-section__copy">{digital[2]}</p></section>
    <section className="final-cta"><p>{finale[0]}</p><h2>{finale[1]}</h2><a href="#main-site">{finale[2]} ↑</a></section>
  </>;
}
