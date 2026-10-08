import type { Language } from "./scenes";

export const navItems = [
  ["HOME", "முகப்பு", "main-site"],
  ["HERITAGE", "மரபு", "culture"],
  ["CULTURE", "பண்பாடு", "culture"],
  ["ARCHITECTURE", "கட்டிடக்கலை", "architecture"],
  ["ARTS", "கலைகள்", "dance"],
  ["TRADITIONS", "மரபுகள்", "traditions"],
  ["LANGUAGE", "மொழி", "language"],
  ["ABOUT", "பற்றி", "preservation"],
] as const;

export const ui = {
  en: {
    brand: "TAMIL HERITAGE",
    introLines: ["ENTER THE", "SOUL OF", "TAMIL", "CULTURE"],
    introDescription: "Preserving culture through digital innovation",
    scrollCue: "SCROLL TO BEGIN",
    skipIntro: "Skip intro",
    arrivalTitle: "Enter Tamil culture",
    arrivalDescription: "Explore stories, arts, places and living traditions.",
    enter: "ENTER TO EXPLORE",
    switchLanguage: "Switch language",
    mainNavigation: "Main navigation",
    menu: "Menu",
    close: "Close",
    imageUnavailable: "Image unavailable",
  },
  ta: {
    brand: "தமிழ் மரபு",
    introLines: ["தமிழ்", "பண்பாட்டின்", "ஆன்மாவுக்குள்", "ஒரு பயணம்"],
    introDescription: "டிஜிட்டல் புத்தாக்கத்தின் மூலம் பண்பாட்டைப் பாதுகாப்போம்",
    scrollCue: "கீழே பயணிக்கவும்",
    skipIntro: "அறிமுகத்தைத் தவிர்க்கவும்",
    arrivalTitle: "தமிழ் பண்பாட்டிற்குள் நுழையுங்கள்",
    arrivalDescription: "கதைகள், கலைகள், இடங்கள் மற்றும் வாழும் மரபுகளை ஆராயுங்கள்.",
    enter: "ஆராய நுழையுங்கள்",
    switchLanguage: "மொழியை மாற்றுங்கள்",
    mainNavigation: "முதன்மை வழிசெலுத்தல்",
    menu: "பட்டியல்",
    close: "மூடு",
    imageUnavailable: "படம் கிடைக்கவில்லை",
  },
} as const satisfies Record<Language, Record<string, string | readonly string[]>>;
