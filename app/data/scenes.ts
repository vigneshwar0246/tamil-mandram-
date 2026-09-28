export type Language = "en" | "ta";

export const cinematicTimeline = {
  introEnd: 0.1,
  firstSceneStart: 0.11,
  arrivalStart: 0.82,
} as const;

export const scenes = [
  { start: cinematicTimeline.firstSceneStart, end: 0.23, chapter: "01", align: "left", en: ["LIVING LAND", "A Land Where Heritage Lives", "Tamil culture begins in its living landscape — fields, seasons, labour and shared memory."], ta: ["வாழும் நிலமும் மரபும்", "மரபு வாழும் நிலம்", "வயல், பருவம், உழைப்பு, பகிர்ந்த நினைவு — இவையெல்லாம் தமிழர் பண்பாட்டின் உயிர்."] },
  { start: 0.23, end: 0.35, chapter: "02", align: "right", en: ["TAMIL ARCHITECTURE", "Sacred Spaces, Enduring Vision", "Temple architecture joins art, engineering, ritual and community in a language of stone."], ta: ["தமிழ்க் கட்டிடக்கலை", "காலம் தாண்டும் புனித வெளிகள்", "கலை, பொறியியல், வழிபாடு, சமூக வாழ்வு ஆகியவற்றை கோயில் கட்டிடக்கலை இணைக்கிறது."] },
  { start: 0.35, end: 0.47, chapter: "03", align: "left", en: ["HERITAGE KNOWLEDGE", "Knowledge Carved Into Memory", "Details, inscriptions and artistic forms carry learning forward across generations."], ta: ["மரபு அறிவும் கலைப்பாடும்", "நினைவில் செதுக்கப்பட்ட அறிவு", "சிற்பம், கல்வெட்டு, கலை வடிவம் ஆகியவை தலைமுறைகளைத் தாண்டி அறிவை சுமக்கின்றன."] },
  { start: 0.47, end: 0.59, chapter: "04", align: "right", en: ["PERFORMING ARTS", "Tradition in Every Movement", "Dance, music and performance preserve stories, emotions and ritual through the body."], ta: ["நிகழ்கலை", "ஒவ்வோர் அசைவிலும் ஒரு மரபு", "நடனம், இசை, நிகழ்கலை வழியாகக் கதைகளும் உணர்வுகளும் சடங்குகளும் வாழ்கின்றன."] },
  { start: 0.59, end: 0.7, chapter: "05", align: "left", en: ["FESTIVALS & TRADITIONS", "Community in Celebration", "Processions and festivals renew a culture through participation, devotion and belonging."], ta: ["திருவிழாக்களும் மரபுகளும்", "கொண்டாட்டத்தில் கூடும் சமூகம்", "ஊர்வலமும் திருவிழாவும் பங்கேற்பு, பக்தி, உறவு வழியாக மரபை புதுப்பிக்கின்றன."] },
  { start: 0.7, end: cinematicTimeline.arrivalStart, chapter: "06", align: "right", en: ["TEMPLES & SACRED ARCHITECTURE", "Temples That Carry Centuries", "The final temple stands as a living expression of Tamil architecture, art and collective memory."], ta: ["கோயில்களும் புனிதக் கட்டிடக்கலையும்", "நூற்றாண்டுகளைத் தாங்கும் கோயில்கள்", "தமிழ் கோயில்கள் கட்டிடக்கலை, கலை, சமூக நினைவு ஆகியவற்றின் உயிருள்ள வெளிப்பாடுகள்."] },
] as const;
