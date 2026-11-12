import fs from "fs";
import path from "path";
import { AUDIO_TOURS } from "../app/data/audio-tour.ts";

const API_KEY = "sk_m5q357zg_STs2tcWJuKwyvq6l53VCosQl";

const LANG_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  sa: "hi-IN",
  kn: "kn-IN",
  ta: "ta-IN",
  te: "te-IN",
  ml: "ml-IN",
  mr: "mr-IN",
  bn: "bn-IN",
  gu: "gu-IN",
  pa: "pa-IN",
  or: "od-IN",
};

/**
 * Common English tech terminology and acronyms mapped from Indic script transliterations
 * to standard English words so Sarvam AI Bulbul:v3 natively pronounces them with crisp,
 * natural tech pronunciation (e.g. "AWS" instead of awkward "एडब्ल्यूएस").
 */
const TECH_REPLACEMENTS = [
  // AWS
  [/एडब्ल्यूएस|ए\s*डब्ल्यू\s*एस|एडब्लूएस/gi, "AWS"],
  [/ಎಡಬ್ಲ್ಯೂಎಸ್|ಎಡಬ್ಲ್ಯುಎಸ್|ಎ\s*ಡಬ್ಲ್ಯೂ\s*ಎಸ್/gi, "AWS"],
  [/ஏடபிள்யூஎஸ்|ஏடபிள்யுஎஸ்|ஏ\s*டபிள்யூ\s*எஸ்/gi, "AWS"],
  [/ఏడబ్ల్యూఎస్|ఏడబ్ల్యుఎస్|ఏ\s*డబ్ల్యూ\s*ఎస్/gi, "AWS"],
  [/എഡബ്ല്യുഎസ്|എ\s*ഡബ്ല്യു\s*എസ്/gi, "AWS"],
  [/এডব্লিউএস|এডব্লুএস/gi, "AWS"],
  [/એડબ્લ્યુએસ|એડબ્લુએસ/gi, "AWS"],
  [/ਏਡਬਲਿਊਐਸ|ਏਡਬਲਯੂਐਸ/gi, "AWS"],
  [/ଏଡବ୍ଲ୍ୟୁଏସ୍|ଏଡବ୍ଲୁଏସ୍/gi, "AWS"],

  // IoT Core & IoT (Ensure IoT Core matches before bare IoT)
  [/आईओटी\s*कोर|आईओटी-कोर|ഐಒಟಿ\s*ಕೋರ್|ஐஓடி\s*கோர்|ఐఓటీ\s*కోర్|ഐഒടി\s*കോർ|आयओटी\s*कोर|আইওটি\s*কোর|આઈઓટી\s*કોર|ਆਈਓਟੀ\s*ਕੋਰ|ଆଇଓଟି\s*କୋର୍/gi, "IoT Core"],
  [/आईओटी|आयओटी|ഐഒടി|ఐఓటీ|ஐஓடி|ഐಒಟಿ|আইওটি|આઈઓટી|ਆਈਓਟੀ|ଆଇଓଟି/gi, "IoT"],

  // MQTT
  [/एमक्यूटीटी|ఎంక్యూటీటీ|ಎಂಕ್ಯೂಟಿಟಿ|എംക്യുടിടി|எம்யூடிடி|எம்\.க்யூ\.டி\.டி|এমকিউটিটি|એમક્યુટીટી|ਐਮਕਿਊਟੀਟੀ|ଏମକ୍ୟୁଟିଟି/gi, "MQTT"],

  // Kinesis
  [/काइनेसिस|ಕೈನೆಸಿಸ್|கைனெசிஸ்|కైనెసిస్|കൈനസിസ്|कायनेसिस|কাইনেসিস|કાઇનેસિસ|ਕਾਇਨੇਸਿਸ|କାଇନେସିସ୍/gi, "Kinesis"],

  // Java & Spring Boot
  [/जावा[\s\-]*(?:स्प्रिंग|स्प्रिङ्ग)[\s\-]*बूट|ಜಾವಾ\s*ಸ್ಪ್ರಿಂಗ್\s*ಬೂಟ್|ஜாவா\s*ஸ்பிரிங்\s*பூட்|జావా\s*స్ప్రింగ్\s*బూట్|ജാവ\s*സ്പ്രിംഗ്\s*ബൂട്ട്|জাভা\s*স্প্রিং\s*বুট|જાવા\s*સ્પ્રિંગ\s*બૂટ|ਜਾਵਾ\s*ਸਪ੍ਰਿੰਗ\s*ਬੂਟ|ଜାଭା\s*ସ୍ପ୍ରିଙ୍ଗ୍\s*ବୁଟ୍/gi, "Java Spring Boot"],
  [/(?:स्प्रिंग|स्प्रिङ्ग)[\s\-]*बूट|ಸ್ಪ್ರಿಂಗ್\s*ಬೂಟ್|ஸ்பிரிங்\s*பூட்|స్ప్రింగ్\s*బూಟ್|സ്പ്രിംഗ്\s*ബൂട്ട്|স্প্রিং\s*বুট|સ્પ્રિંગ\s*બૂટ|ਸਪ੍ਰਿੰਗ\s*ਬੂਟ|ସ୍ପ୍ରିଙ୍ଗ୍\s*ବୁଟ୍/gi, "Spring Boot"],
  [/जावा|ಜಾವಾ|ஜாவா|జావా|ജാവ|জাভা|જાવા|ਜਾਵਾ|ଜାଭା/gi, "Java"],

  // Microservices
  [/माइक्रोसर्विसेज|मायक्रोसर्व्हिसेस|ಮೈಕ್ರೋಸರ್ವೀಸ್‌ಗಳು|ಮೈಕ್ರೋಸರ್ವೀಸ್‌|மைக்ரோசர்வீஸ்கள்|மைக்ரோசர்வீஸ்|మైక్రోసర్వీసెస్|మైక్రోసర్వీస్|മൈക്രോസർവീസുകൾ|മൈക്രോസർവീസസ്|মাইক্রোসার্ভিসেস|মাইক্রোসার্ভিস|માઇક્રોસર્વિસિસ|ਮਾਈਕ੍ਰੋਸਰਵਿਸਿਜ਼|ମାଇକ୍ରୋସର୍ଭିସ୍|ମାଇକ୍ରୋସର୍ଭିସେସ୍/gi, "microservices"],

  // Redis
  [/रेडिस|ರೆಡಿಸ್|ரெடிஸ்|రెడిస్|റെഡിസ്|রেডিস|રેડિસ|ਰੇਡਿਸ|ରେଡିସ୍/gi, "Redis"],

  // Kafka
  [/काफ़्का|काफ्का|ಕಾಫ್ಕಾ|காஃப்கா|కాఫ్కా|കാഫ്ക|কাফকা|કાફકા|ਕਾਫਕਾ|କାଫକା/gi, "Kafka"],

  // Observability & Metrics
  [/माइक्रोमीटर[\s\-]*मापकैः|माइक्रोमीटर[\s\-]*मापक|माइक्रोमीटर|ಮೈಕ್ರೋಮೀಟರ್|மைக்ரோமீட்டர்|మైక్రోమీటర్|മൈക്രോമീറ്റർ|मायक्रोमीटर|মাইক্রোমিটার|માઇક્રોમીટર|ਮਾਈਕ੍ਰੋਮੀਟਰ|ମାଇକ୍ରୋମିଟର/gi, "Micrometer"],
  [/प्रोमेथियस|ಪ್ರೊಮಿಥಿಯಸ್|ಪ್ರೊಮೆಥಿಯಸ್|ப்ரோமிதியஸ்|ప్రొమిథియస్|പ്രൊമിത്യൂസ്|പ്രൊമിതിയസ്|প্রমিথিউস|પ્રોમિથિયસ|ਪ੍ਰੋਮੀਥੀਅਸ|ପ୍ରୋମେଥିୟସ୍/gi, "Prometheus"],
  [/ग्राफाना|ಗ್ರಾಫಾನಾ|கிரஃபானா|గ్రాఫానా|ഗ്രാഫാന|গ্রাফানা|ગ્રાફાના|ਗ੍ਰਾਫਾਨਾ|ଗ୍ରାଫାନା/gi, "Grafana"],
  [/बकेट[\s\-]*(?:फॉर|फ़ॉर)[\s\-]*जे|ಬಕೆಟ್[\s\-]*ಫಾರ್[\s\-]*ಜೆ|பக்கெட்[\s\-]*ஃபார்[\s\-]*ஜே|బకెట్[\s\-]*ఫర్[\s\-]*జే|ബക്കറ്റ്[\s\-]*ഫോർ[\s\-]*ജെ|বাকেট[\s\-]*ফর[\s\-]*জে|બકેટ[\s\-]*ફોર[\s\-]*જે|ਬਕੇਟ[\s\-]*ਫਾਰ[\s\-]*ਜੇ|ବକେଟ୍[\s\-]*ଫର୍[\s\-]*ଜେ/gi, "Bucket4j"],

  // Android, APIs, Mobile
  [/एपीआई|ஏபிஐ|ఏపీఐ|ಎಪಿಐ/gi, "APIs"],
  [/एंड्रॉइड|एण्ड्रॉयड|ಆಂಡ್ರಾಯ್ಡ್|ஆண்ட்ராய்டு|ఆండ్రాయిడ్|ആൻഡ്രോയിഡ്|अँड्रॉइड|অ্যান্ড্রয়েড|એન્ડ્રોઇડ|ਐਂਡਰਾਇਡ|ଆଣ୍ଡ୍ରଏଡ୍/gi, "Android"],
  [/एमवीवीएम|ఎంవీవీఎం|ಎಂವಿವಿಎಂ|எம்விவிஎம்|ਐਮਵੀਵੀਐਮ|എംവിവിഎം|एमव्हीव्हीएम|এমভিভিএম|એમવીવીએમ|ଏମଭିଭିଏମ/gi, "MVVM"],
  [/एनएफसी|ಎನ್‌ಎಫ್‌ಸಿ|என்எஃப்சி|ఎన్‌ಎఫ్‌సీ|എൻഎഫ്സി|এনএফসি|એનએફસી|ਐਨਐਫਸੀ|ଏନଏଫସି/gi, "NFC"],
  [/क्यूआर|क्युआर|ಕ್ಯೂಆರ್|க்யூஆர்|కిউআর|ക്യുആർ|ક્યૂઆર|ਕਿਊਆਰ|କ୍ୟୁଆର/gi, "QR"],
  [/पीओएस|ಪಿಒಎಸ್|பிஓஎஸ்|పీఓఎస్|പിഒഎസ്|পিওഎസ്|પીઓએસ|ਪੀਓਐਸ|ପିଓଏସ/gi, "POS"],
  [/एसडीके|ಎಸ್‌ಡಿಕೆ|எஸ்டிகே|ఎస్డీకే|എസ്ഡികെ|এসডিকে|એસડીકે|ਐਸਡੀਕੇ|ଏସଡିକେ/gi, "SDKs"],
  [/ऑस्टेलो|ಓಸ್ಟೆಲ್ಲೊ|ಒಸ್ಟೆಲ್ಲೊ|ஆஸ்டெல்லோ|ఓస్టెల్లో|ഒസ്റ്റെല്ലോ|অস্টেলো|ઓસ્ટેલો|ਓਸਟੇਲੋ|ଓଷ୍ଟେଲୋ/gi, "Ostello"],
  [/ब्लूपएक्स|ಬ್ಲೂಪ್‌ಎಕ್ಸ್|ಬ್ಲೂಪ್ಎಕ್ಸ್|ಪ್ளூப்எக்ஸ்|బ్లూప్‌ఎక్స్|ബ്ലൂപ്എക്സ്|ব্লুপএক্স|બ્લૂપએક્સ|ਬਲੂਪਐਕਸ|ବ୍ଲୁପ୍‌ଏକ୍ସ/gi, "BlupX"],
  [/रिवरपॉड|ರಿವರ್‌ಪಾಡ್|ರಿವರ್ಪಾಡ್|ரிவர்பாட்|రివర్‌పాడ్|റിവർപോഡ്|रिव्हरपॉड|রিভারপড|રિવરપોડ|ਰਿਵਰਪੌਡ|ରିଭରପଡ୍/gi, "Riverpod"],
  [/रेज़रपे|ರೇಜರ್‌ಪೇ|ರೇಜರ್ಪೇ|ரேஸர்பே|రేజర్‌పే|റേസർപേ|रेझरपे|রেজরপে|રેઝરપે|ਰੇਜ਼ਰਪੇ|ରେଜରପେ/gi, "Razorpay"],

  // AI & Projects
  [/टॉकिंग[\s\-]*यूट्यूब|ಟಾಕಿಂಗ್\s*ಯೂಟ್ಯೂಬ್|டாக்கிங்\s*யூடியூப்|టాకింగ్\s*యూట్యూబ్|ടോക്കിങ്\s*യൂട്യൂബ്|টকিং\s*ইউটিউব|ટોકિંગ\s*યુટ્યુબ|ਟਾਕਿੰਗ\s*ਯੂਟਿਊਬ|ଟକିଂ\s*ୟୁଟ୍ୟୁବ୍/gi, "TalkingYouTube"],
  [/यूट्यूब|ಯೂಟ್ಯೂಬ್|யூடியூப்|యూట్యూబ్|യൂട്യൂബ്|ইউটিউব|યુટ્યુબ|ਯੂਟਿਊਬ|ୟୁଟ୍ୟୁବ୍/gi, "YouTube"],
  [/लैंगचेन|ಲ್ಯಾಂಗ್‌ಚೈನ್|லாங்செயின்|లాంగ్‌చైన్|ലാംഗ്‌ചെയിൻ|लँगचेन|ল্যাংচেন|લેંગચેઇન|ਲੈਂਗਚੇਨ|ଲାଙ୍ଗଚେନ୍/gi, "LangChain"],
  [/एफएआईएसएस|ಎಫ್‌ಎಐಎಸ್‌ಎಸ್|எஃப்ஏஐஎஸ்எஸ்|ఎఫ్‌ఏఐఎస్‌ఎస్|എഫ്‌എഐഎസ്എസ്|এফএআইএসএস|એફએઆઈએસએસ|ਐਫਏਆਈਐਸਐਸ|ଏଫ୍‌ଏଆଇଏସ୍‌ଏସ୍/gi, "FAISS"],
  [/क्यूब[\s\-]*ट्रांजिट|क्यूब[\s\-]*ट्रांजिट्|क्यूबट्रांजिट्|ಕ್ಯೂಬ್[\s\-]*ಟ್ರಾನ್ಸಿಟ್|கியூப்[\s\-]*டிரான்சிட்|க்யூப்[\s\-]*டிரான்சிட்|క్యూబ్[\s\-]*ట్రాన్సిట్|ക്യൂബ്[\s\-]*ട്രാൻസിറ്റ്|क्युब[\s\-]*ट्रान्झिट|কিউবট্রানজিট|ક્યુબટ્રાન્ઝિટ|ਕਯੂਬ[\s\-]*ਟ੍ਰਾਂਜਿਟ|କ୍ୟୁବ୍[\s\-]*ଟ୍ରାଞ୍ଜିଟ୍/gi, "KubeTransit"],
  [/कुबरनेट्स|कुबरनेट्सवरील|ಕುಬರ್ನೆಟಿಸ್|குபர்நெட்டீஸ்|కుబెర్‌నెటీస్|കുബർനെറ്റിസ്|কুবারনেটিস|કુબરનેટ્સ|ਕੁਬਰਨੇਟਿਸ|କୁବର୍ଣ୍ଣେଟିସ୍/gi, "Kubernetes"],
  [/के3एस|ಕೆ3ಎಸ್|கே3ಎಸ್|కే3ఎస్|കെ3എസ്|কে3এস|કે3એસ|ਕੇ3ਐਸ|କେ3ଏସ୍/gi, "k3s"],
  [/लिंक्डइन|लिंक्डइन्|ಲಿಂಕ್ಡ್‌ಇನ್|லிங்க்ட்இன்|లింక్డ్‌ఇన్|ലിങ്ക്ഡ്ഇൻ|লিঙ্কডইন|લિંક્ડઇન|ਲਿੰਕਡਇਨ|ଲିଙ୍କଡଇନ୍/gi, "LinkedIn"],
  [/गिटहब|ಗಿಟ್‌ಹಬ್|ಗಿಟ್ಹಬ್|கிட்ஹப்|గిట్‌హబ్|ഗിറ്റ്ಹബ്|গিটহাব|ગિટહબ|ਗਿਟਹਬ|ଗିଟହବ୍/gi, "GitHub"],
  [/जेनरेटिव\s*एआई|जैनरेटिव\s*एआई|ଜେନେରେଟିଭ୍\s*ଏଆଇ|ਜੈਨਰੇਟਿਵ\s*ਏਆਈ|જનરેટિવ\s*એઆઈ|জেনারেটিভ\s*এআই|ജനറേറ്റീവ്\s*എഐ|జెనరేటివ్\s*ఏఐ|ஜெனரேட்டிவ்\s*ஏஐ|ಜನರೇಟಿವ್\s*ಎಐ|जनरेटिव्ह\s*एआय/gi, "Generative AI"],
  [/एक्सेंचर|अ‍ॅक्सेंचरमध्ये|अ‍ॅक्सेंचर|એક્સેન્ચરમાં|એક્સેન્ચર|ਐਕਸੈਂਚਰ|ಅಕ್ಸೆಂಚರ್‌ನಲ್ಲಿ|ಅಕ್ಸೆಂಚರ್|அக்சென்ச்சரில்|அக்சென்ச்சர்|యాక్సెంట్చర్‌లో|యాక్సెంట్చర్|ആക്സെഞ്ചറിൽ|ആക്സെഞ്ചർ|অ্যাকসেন্টারে|অ্যাকসেন্টার|ଆକ୍ସେଞ୍ଚର୍ରେ|ଆକ୍ସେଞ୍ଚର୍|एक्सेञ्चर्[\s\-]*संस्थायां|एक्सेञ्चर्/gi, "Accenture"],
  [/पोर्टफोलियो|पोर्टफोलिओ|ಪೋರ್ಟ್‌ಫೋಲಿಯೊಗೆ|ಪೋರ್ಟ್‌ಫೋಲಿಯೊ|போர்ட்ஃபோலியோ|పోర్ట్‌ఫోలియో|പോർട്ട്ഫോളിയോ|পোর্টফোলিও|પોર્ટફોલિયો|ਪੋਰਟਫੋਲੀਓ|ପୋର୍ଟଫୋଲିଓ/gi, "portfolio"],
  [/ओपन[\s\-]*(?:सोर्स|स्रोतः)|ಓಪನ್[\s\-]*ಸೋರ್ಸ್|ಓಪನ್\s*ಸೋರ್ಸ್|ஓபன்[\s\-]*சோர்ஸ்|ஓபன்\s*சோர்ஸ்|ఓపెన్[\s\-]*సోర్స్|ഓപ്പൺ[\s\-]*സോഴ്സ്|ওপেন[\s\-]*সোর্স|ઓપન[\s\-]*સોર્સ|ਓਪਨ[\s\-]*ਸੋਰਸ|ଓପନ[\s\-]*ସୋର୍ସ/gi, "open-source"],
];

function cleanTextForSpeech(text) {
  return text
    .replace(/["“”]/g, "")
    .replace(/[—–]/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

function prepareTextForSpeech(text, lang) {
  if (lang === "en") return cleanTextForSpeech(text);

  let transformed = text;
  for (const [pattern, replacement] of TECH_REPLACEMENTS) {
    transformed = transformed.replace(pattern, replacement);
  }
  return cleanTextForSpeech(transformed);
}

function splitIntoChunks(text, maxLen = 350) {
  const sentences = text.match(/[^.!?।]+[.!?।]+|\S+/g) || [text];
  const chunks = [];
  let current = "";
  for (const s of sentences) {
    if ((current + " " + s).trim().length <= maxLen) {
      current = (current + " " + s).trim();
    } else {
      if (current) chunks.push(current);
      current = s.trim();
    }
  }
  if (current) chunks.push(current);
  return chunks.filter((c) => c.length > 0);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Appends clean trailing silence to a PCM WAV buffer so speech is never abruptly
 * cut off by media playback pipelines or early hardware drain.
 */
export function padWavWithSilence(buf, silenceSec = 0.6) {
  const riff = buf.toString("ascii", 0, 4);
  const wave = buf.toString("ascii", 8, 12);
  if (riff !== "RIFF" || wave !== "WAVE") return buf;

  const sampleRate = buf.readUInt32LE(24);
  const channels = buf.readUInt16LE(22);
  const bitsPerSample = buf.readUInt16LE(34);
  const bytesPerSample = (bitsPerSample / 8) * channels;
  const bytesToAdd = Math.floor(sampleRate * bytesPerSample * silenceSec);

  let dataOffset = 36;
  while (dataOffset < buf.length - 8) {
    if (buf.toString("ascii", dataOffset, dataOffset + 4) === "data") break;
    const chunkSize = buf.readUInt32LE(dataOffset + 4);
    dataOffset += 8 + chunkSize;
  }

  if (buf.toString("ascii", dataOffset, dataOffset + 4) !== "data") return buf;

  const oldDataSize = buf.readUInt32LE(dataOffset + 4);
  const newDataSize = oldDataSize + bytesToAdd;
  const newChunkSize = buf.readUInt32LE(4) + bytesToAdd;

  const silence = Buffer.alloc(bytesToAdd, 0);
  const newBuf = Buffer.concat([buf, silence]);
  newBuf.writeUInt32LE(newChunkSize, 4);
  newBuf.writeUInt32LE(newDataSize, dataOffset + 4);
  return newBuf;
}

async function synthesizeText(text, targetLang, lang) {
  const speechText = prepareTextForSpeech(text, lang);
  const chunks = splitIntoChunks(speechText, 350);

  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: chunks,
      target_language_code: targetLang,
      speaker: "aditya",
      model: "bulbul:v3",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  if (!data.audios || !data.audios[0]) {
    throw new Error(`No audio returned: ${JSON.stringify(data)}`);
  }

  const rawWav = Buffer.from(data.audios[0], "base64");
  // Pad with 600ms of clean trailing PCM silence
  return padWavWithSilence(rawWav, 0.6);
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const padExisting = args.includes("--pad-existing");
  const specificLangArg = args.find((a) => a.startsWith("--lang="));
  const specificLang = specificLangArg ? specificLangArg.split("=")[1] : null;
  const specificIdsArg = args.find((a) => a.startsWith("--ids="));
  const specificIds = specificIdsArg ? specificIdsArg.split("=")[1].split(",") : null;

  if (padExisting) {
    console.log("Padding trailing silence (600ms) to existing WAV files across all languages...");
    const baseDir = path.join("public", "audio");
    if (!fs.existsSync(baseDir)) return;
    let paddedCount = 0;
    for (const lang of fs.readdirSync(baseDir)) {
      const langDir = path.join(baseDir, lang);
      if (!fs.statSync(langDir).isDirectory()) continue;
      for (const file of fs.readdirSync(langDir)) {
        if (!file.endsWith(".wav")) continue;
        const filePath = path.join(langDir, file);
        const originalBuf = fs.readFileSync(filePath);
        const paddedBuf = padWavWithSilence(originalBuf, 0.6);
        fs.writeFileSync(filePath, paddedBuf);
        paddedCount++;
      }
    }
    console.log(`✓ Successfully padded ${paddedCount} audio files with trailing silence.`);
    return;
  }

  console.log("Starting Studio Sarvam AI Audio Generation with Hinglish/Code-Mixed tech terms...");
  if (force) console.log("(--force flag active: overwriting existing audio files)");
  if (specificLang) console.log(`(Filtering for language: ${specificLang})`);
  if (specificIds) console.log(`(Filtering for brief IDs: ${specificIds.join(", ")})`);

  const allLangs = Object.keys(AUDIO_TOURS);
  const langs = specificLang ? [specificLang] : allLangs;

  let totalCount = 0;
  let successCount = 0;
  let skipCount = 0;

  for (const lang of langs) {
    const targetLang = LANG_MAP[lang];
    if (!targetLang) {
      console.warn(`[WARN] No targetLang mapping for ${lang}, skipping.`);
      continue;
    }

    const outDir = path.join("public", "audio", lang);
    fs.mkdirSync(outDir, { recursive: true });

    const briefs = AUDIO_TOURS[lang] || [];
    console.log(`\n=== Language: ${lang} (${targetLang}) [${briefs.length} briefs] ===`);

    for (const brief of briefs) {
      const { id, text } = brief;
      if (specificIds && !specificIds.includes(id)) {
        continue;
      }

      const outFile = path.join(outDir, `${id}.wav`);
      totalCount++;

      if (!force && fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
        console.log(`[SKIP] Already exists: ${outFile}`);
        skipCount++;
        continue;
      }

      console.log(`[SYNTHESIZING] ${lang} -> ${id}`);
      let attempts = 0;
      let ok = false;

      while (attempts < 3 && !ok) {
        attempts++;
        try {
          const audioBuffer = await synthesizeText(text, targetLang, lang);
          fs.writeFileSync(outFile, audioBuffer);
          const sizeKb = (audioBuffer.length / 1024).toFixed(1);
          console.log(`  ✓ Saved ${outFile} (${sizeKb} KB)`);
          successCount++;
          ok = true;
          await sleep(350);
        } catch (err) {
          console.error(`  ✗ Attempt ${attempts} failed for ${lang}/${id}:`, err.message);
          await sleep(1500);
        }
      }

      if (!ok) {
        console.error(`  !!! FAILED permanently for ${lang}/${id}`);
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Audio Generation finished. Total: ${totalCount}, Synthesized: ${successCount}, Skipped: ${skipCount}`);
  console.log(`========================================\n`);
}

// Only execute main if run directly
if (process.argv[1] && process.argv[1].endsWith("generate-audio-tour.mjs")) {
  main().catch(console.error);
}
