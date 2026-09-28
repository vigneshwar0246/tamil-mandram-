export type Culture = {
  id: string;
  number: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  image: string;
  detailEn: string;
  detailTa: string;
  significanceEn: string;
  significanceTa: string;
  related: string[];
};

const stories = [
  ["Tamil connects ancient grammar, Sangam poetry, devotional songs, modern writing and everyday speech. Its literature remains a living way of naming the world and sharing memory.", "தமிழ் பழமையான இலக்கணம், சங்கக் கவிதை, பக்திப் பாடல்கள், நவீன எழுத்து, அன்றாடப் பேச்சு ஆகியவற்றை இணைக்கிறது. இது உலகை அறிந்து நினைவைப் பகிரும் வாழும் வழி."],
  ["Tamil temples are choreographed landscapes of tower, corridor, tank, sculpture and ritual. Their proportions and craftsmanship make architecture a shared civic language.", "தமிழ் கோயில்கள் கோபுரம், மண்டபம், குளம், சிற்பம், சடங்கு ஆகியவை ஒன்றிணைந்த வெளிகள். அவற்றின் அளவுகளும் கைவினையும் கட்டிடத்தை ஒரு சமூக மொழியாக்குகின்றன."],
  ["Gesture, rhythm, expression and disciplined footwork allow Bharatanatyam to speak without ordinary conversation. The stage joins music, poetry, mythology and the trained body.", "முத்திரை, தாளம், அபிநயம், பயிற்சி பெற்ற காலடி ஆகியவை பரதநாட்டியத்தை உரையாடலுக்கு அப்பாற்பட்ட மொழியாக்குகின்றன. மேடை இசை, கவிதை, புராணம், உடல் ஆகியவற்றின் சந்திப்பாகிறது."],
  ["Folk forms grow from village squares, seasonal celebrations and shared work. Costumes, instruments and stories change with place while retaining a recognisable social pulse.", "மக்கள் கூடும் இடங்களில் நாட்டுப்புற வடிவங்கள் வளர்கின்றன. உடை, இசைக்கருவி, கதை இடத்தோடு மாறினாலும் சமூகத் துடிப்பு தொடர்கிறது."],
  ["Festivals turn calendars into lived gatherings. Pongal, temple festivals and family rituals connect harvest, gratitude, food, music, colour and movement.", "திருவிழாக்கள் நாட்காட்டியை வாழும் கூடுகையாக மாற்றுகின்றன. பொங்கல், கோயில் திருவிழா, குடும்பச் சடங்குகள் அறுவடை, நன்றி, உணவு, இசை, நிறம், அசைவை இணைக்கின்றன."],
  ["Tamil cooking carries the ecology of its region: grains, pulses, vegetables, spices and methods shaped by season. A meal is an act of care, hospitality and family memory.", "தமிழ் சமையல் அதன் நிலப்பரப்பின் இயற்கையை தாங்குகிறது. உணவு அன்பு, விருந்தோம்பல், குடும்ப நினைவின் செயலும் ஆகும்."],
  ["Craft is a conversation between material and hand. Weaving, carving and metalwork turn local materials into forms of use, beauty and identity.", "கைவினை என்பது பொருளுக்கும் கைக்கும் இடையிலான உரையாடல். நெசவு, செதுக்கல், உலோக வேலை ஆகியவை உள்ளூர் பொருளை பயன்பாடு, அழகு, அடையாளமாக்குகின்றன."],
  ["From nadaswaram and thavil to devotional song and village performance, Tamil music fills spaces with occasion. It carries language through breath, pulse and repetition.", "நாதஸ்வரம், தவில், பக்திப் பாடல், நாட்டுப்புற நிகழ்வு வரை தமிழ் இசை இடங்களை விழாக்கால உணர்வால் நிரப்புகிறது. மூச்சு, துடிப்பு வழியாக மொழியை சுமக்கிறது."],
  ["Dress carries climate, craft, ceremony and identity close to the body. Draping, weaving, jewellery and colour connect personal style to regional knowledge.", "உடை காலநிலை, கைவினை, சடங்கு, அடையாளம் ஆகியவற்றை உடலோடு நெருக்கமாக சுமக்கிறது. நெசவு, நகை, நிறம் வட்டார அறிவோடு இணைக்கின்றன."],
  ["Agricultural life reads soil, rain, seed and season as a connected system. Village practices organise cooperation, celebration, food and care for shared landscapes.", "வேளாண் வாழ்க்கை மண், மழை, விதை, பருவம் ஆகியவற்றை இணைந்த அமைப்பாக வாசிக்கிறது. கிராம நடைமுறைகள் ஒத்துழைப்பு, கொண்டாட்டம், உணவு, பொதுநிலப் பாதுகாப்பை அமைக்கின்றன."],
  ["Silambam and related physical traditions train balance, alertness and respect alongside technique. The body becomes a place where history, protection and self-knowledge are practised.", "சிலம்பம் போன்ற உடற்கலை மரபுகள் சமநிலை, விழிப்புணர்வு, மரியாதையையும் பயிற்றுவிக்கின்றன. உடல் வரலாறு, பாதுகாப்பு, சுயஅறிவு பயிற்சி பெறும் இடமாகிறது."],
  ["Monuments give history a physical address. Forts, memorials, old streets and temple cities reveal layers of people, power, trade and belief.", "நினைவுச் சின்னங்கள் வரலாற்றுக்கு ஒரு உடல் முகவரியைத் தருகின்றன. கோட்டைகள், நினைவிடங்கள், பழைய தெருக்கள், கோயில் நகரங்கள் வரலாற்றின் அடுக்குகளை வெளிப்படுத்துகின்றன."],
] as const;

const base = [
  ["language", "Tamil Language & Literature", "தமிழ் மொழி மற்றும் இலக்கியம்", "A classical language carried by poetry, scholarship and living speech.", "கவிதை, அறிவு, வாழும் பேச்சு வழியாகத் தொடரும் செம்மொழி.", "script.png", ["music", "monuments", "village-life"]],
  ["architecture", "Temple Architecture", "கோயில் கட்டிடக்கலை", "Stone, sculpture and engineering shaped into sacred civic spaces.", "கல், சிற்பம், பொறியியல் இணையும் புனித சமூக வெளிகள்.", "5fbe666f-f874-41ca-a44a-cc538d704832.png", ["monuments", "festivals", "music"]],
  ["dance", "Bharatanatyam & Classical Performance", "பரதநாட்டியமும் செவ்வியல் நிகழ்கலையும்", "Movement becomes a language for memory, emotion and story.", "அசைவு நினைவு, உணர்வு, கதையின் மொழியாகிறது.", "baratham.png", ["music", "festivals", "folk-arts"]],
  ["folk-arts", "Folk Dance & Folk Arts", "நாட்டுப்புற நடனமும் கலைகளும்", "Community arts keep local histories and celebration in motion.", "சமூகக் கலைகள் உள்ளூர் வரலாறுகளையும் கொண்டாட்டத்தையும் வாழ வைக்கின்றன.", "folk.png", ["dance", "festivals", "village-life"]],
  ["festivals", "Tamil Festivals", "தமிழ்த் திருவிழாக்கள்", "Season, devotion and community meet in shared ritual.", "பருவம், பக்தி, சமூகம் இணையும் கூட்டு மரபு.", "pongal.png", ["architecture", "cuisine", "folk-arts"]],
  ["cuisine", "Traditional Cuisine", "பாரம்பரிய உணவு", "Food expresses land, season, care and hospitality.", "உணவு நிலம், பருவம், அன்பு, விருந்தோம்பலை வெளிப்படுத்துகிறது.", "food.png", ["festivals", "village-life", "crafts"]],
  ["crafts", "Crafts & Handicrafts", "கைவினைகளும் கைத்தொழிலும்", "Skilled hands pass knowledge and identity through generations.", "திறமையான கைகள் அறிவையும் அடையாளத்தையும் தலைமுறைகளுக்கு தருகின்றன.", "craft.png", ["dress", "architecture", "cuisine"]],
  ["music", "Music & Musical Traditions", "இசையும் இசை மரபுகளும்", "Rhythm and melody preserve devotion, language and feeling.", "தாளமும் ராகமும் பக்தி, மொழி, உணர்வை பாதுகாக்கின்றன.", "ppp.png", ["dance", "architecture", "festivals"]],
  ["dress", "Dress & Ornamentation", "உடையும் அணிகலன்களும்", "Textile, colour and ornament tell social and regional stories.", "நெசவு, நிறம், அணிகலன் சமூக மற்றும் வட்டாரக் கதைகளை சொல்கின்றன.", "dress.png", ["crafts", "festivals", "dance"]],
  ["village-life", "Village & Agricultural Heritage", "கிராமிய மற்றும் வேளாண் மரபு", "Fields and village life hold deep ecological knowledge.", "வயலும் கிராம வாழ்வும் ஆழமான இயற்கை அறிவை தாங்குகின்றன.", "agri.png", ["cuisine", "festivals", "folk-arts"]],
  ["martial", "Martial & Physical Traditions", "வீர மற்றும் உடற்கலை மரபுகள்", "Discipline, agility and courage are practiced cultural knowledge.", "ஒழுக்கம், சுறுசுறுப்பு, துணிவு பயிற்சியாகும் பண்பாட்டு அறிவு.", "ChatGPT Image Sep 28, 2026, 08_21_40 PM.png", ["dance", "folk-arts", "music"]],
  ["monuments", "Historical Places & Monuments", "வரலாற்று இடங்களும் நினைவுச் சின்னங்களும்", "Places make the scale and continuity of history tangible.", "இடங்கள் வரலாற்றின் தொடர்ச்சியையும் பரப்பையும் உணர்த்துகின்றன.", "ChatGPT Image Sep 28, 2026, 08_21_43 PM.png", ["architecture", "language", "music"]],
] as const;

export const cultures: Culture[] = base.map(([id, titleEn, titleTa, descriptionEn, descriptionTa, filename, related], index) => ({
  id, number: String(index + 1).padStart(2, "0"), titleEn, titleTa, descriptionEn, descriptionTa,
  image: `/images/heritage/${id}/${filename}`,
  detailEn: stories[index][0], detailTa: stories[index][1],
  significanceEn: "This living tradition keeps knowledge portable, participatory and meaningful across generations.",
  significanceTa: "இந்த வாழும் மரபு அறிவை தலைமுறைகள் கடந்து பகிரக்கூடியதாகவும் அர்த்தமுள்ளதாகவும் வைத்திருக்கிறது.", related: [...related],
}));
