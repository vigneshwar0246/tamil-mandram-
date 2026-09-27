import type { Language } from "./scenes";

export const translations = {
  en: {
    nav: ["HERITAGE", "CULTURE", "ARTS", "TEMPLES", "TRADITIONS", "LANGUAGE", "ABOUT"],
    hero: ["TAMIL HERITAGE", "Preserving culture through digital innovation", "Explore Tamil heritage through stories, traditions, architecture, arts, crafts, language and living culture.", "EXPLORE HERITAGE", "BEGIN THE JOURNEY"],
    sections: [
      ["HERITAGE OVERVIEW", "A living archive, not a memory", "Tamil heritage is carried through language, places, performance, making and everyday life."],
      ["EXPLORE TAMIL CULTURE", "Many worlds, one living culture", "Follow the threads that connect knowledge, place, community and imagination."],
      ["TEMPLES & ARCHITECTURE", "Stone, scale and symbolism", "Sacred spaces reveal a sophisticated dialogue between engineering, art and devotion."],
      ["DIGITAL PRESERVATION", "Preserving Heritage for the Digital Generation", "Technology can document stories, improve access and make cultural knowledge discoverable for generations to come."],
      ["EVERY TRADITION HAS A STORY.", "EVERY STORY DESERVES TO LIVE ON.", "EXPLORE TAMIL HERITAGE"],
    ],
    cards: ["LANGUAGE", "ARCHITECTURE", "PERFORMING ARTS", "FOLK TRADITIONS", "CUISINE", "CRAFTS", "FESTIVALS", "LITERATURE"],
    explore: "Explore",
  },
  ta: {
    nav: ["மரபு", "பண்பாடு", "கலைகள்", "கோயில்கள்", "பாரம்பரியங்கள்", "மொழி", "பற்றி"],
    hero: ["தமிழ் மரபு", "டிஜிட்டல் புதுமை மூலம் பண்பாட்டைப் பாதுகாத்தல்", "கதைகள், பாரம்பரியங்கள், கட்டிடக்கலை, கலைகள், கைவினைகள், மொழி மற்றும் வாழும் பண்பாட்டின் வழியாக தமிழ் மரபை அறியுங்கள்.", "தமிழ் மரபை ஆராயுங்கள்", "பயணத்தைத் தொடங்குங்கள்"],
    sections: [
      ["மரபின் அறிமுகம்", "நினைவு மட்டுமல்ல, வாழும் களஞ்சியம்", "மொழி, இடம், நிகழ்கலை, கைவினை, அன்றாட வாழ்வு வழியாக தமிழ் மரபு தொடர்கிறது."],
      ["தமிழ்ப் பண்பாட்டை ஆராயுங்கள்", "பல உலகங்கள், ஒரு வாழும் பண்பாடு", "அறிவு, இடம், சமூகம், கற்பனை ஆகியவற்றை இணைக்கும் இழைகளைப் பின்தொடருங்கள்."],
      ["கோயில்களும் கட்டிடக்கலையும்", "கல், அளவு, குறியீடு", "பொறியியல், கலை, பக்தி ஆகியவற்றின் ஆழமான உரையாடலை புனித வெளிகள் வெளிப்படுத்துகின்றன."],
      ["டிஜிட்டல் பாதுகாப்பு", "டிஜிட்டல் தலைமுறைக்காக மரபைப் பாதுகாத்தல்", "தொழில்நுட்பம் கதைகளை ஆவணப்படுத்தி, அணுகலை விரிவுபடுத்தி, மரபு அறிவை எதிர்காலத்திற்குக் கொண்டு செல்கிறது."],
      ["ஒவ்வொரு மரபுக்கும் ஒரு கதை உண்டு.", "ஒவ்வொரு கதையும் தொடர்ந்து வாழ வேண்டும்.", "தமிழ் மரபை ஆராயுங்கள்"],
    ],
    cards: ["மொழி", "கட்டிடக்கலை", "நிகழ்கலை", "நாட்டுப்புற மரபுகள்", "உணவு", "கைவினைகள்", "திருவிழாக்கள்", "இலக்கியம்"],
    explore: "ஆராயுங்கள்",
  },
} as const satisfies Record<Language, unknown>;
