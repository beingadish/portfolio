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

  // IoT Core & IoT (Fixed: map to "IoT Core" without prepending duplicate AWS)
  [/आईओटी\s*कोर/gi, "IoT Core"],
  [/आईओटी|आयओटी|ഐഒടി|ఐఓటీ|ஐஓடி|ಐಒಟಿ|আইওটি|આઈઓટી|ਆਈਓਟੀ|ଆଇଓଟି/gi, "IoT"],

  // MQTT
  [/एमक्यूटीटी|ఎంక్యూటీటీ|ಎಂಕ್ಯೂಟಿಟಿ/gi, "MQTT"],

  // Kinesis
  [/काइनेसिस|ಕೈನೆಸಿಸ್/gi, "Kinesis"],

  // Java & Spring Boot
  [/जावा\s*स्प्रिंग\s*बूट|জাভা\s*স্প্রিং\s*বুট|ஜாவா\s*ஸ்பிரிங்\s*பூட்/gi, "Java Spring Boot"],
  [/स्प्रिंग\s*बूट|ಸ್ಪ್ರಿಂಗ್\s*ಬೂಟ್|ஸ்பிரிங்\s*பூட்|స్ప్రింగ్\s*బూట్|സ്പ്രിംഗ്\s*ബൂട്ട്|স্প্রিং\s*বুট|સ્પ્રિંગ\s*બૂટ|ਸਪ੍ਰਿੰਗ\s*ਬੂਟ|ସ୍ପ୍ରିଙ୍ଗ୍\s*ବୁଟ୍/gi, "Spring Boot"],
  [/जावा|ಜಾವಾ|ஜாவா|జావా|ജാവ|জাভা|જાવા|ਜਾਵਾ|ଜାଭା/gi, "Java"],

  // Microservices
  [/माइक्रोसर्विसेज|मायक्रोसर्व्हिसेस|ಮೈಕ್ರೋಸರ್ವೀಸ್‌ಗಳು|ಮೈಕ್ರೋಸರ್ವೀಸ್‌|மைக்ரோசர்வீஸ்கள்|மைக்ரோசர்வீஸ்|మైక్రోసర్వీసెస్|మైక్రోసర్వీస్|മൈക്രോസർവീസുകൾ|മൈക്രോസർവീസസ്|মাইক্রোসার্ভিসেস|মাইক্রোসার্ভিস|માઇક્રોસર્વિસિસ|ਮਾਈਕ੍ਰੋਸਰਵਿਸਿਜ਼|ମାଇକ୍ରୋସର୍ଭିସ୍|ମାଇକ୍ରୋସର୍ଭିସେସ୍/gi, "microservices"],

  // Redis
  [/रेडिस|ರೆಡಿಸ್|ரெடிസ്|రెడిస్|റെഡിസ്|রেডিস|રેડિસ|ਰੇਡਿਸ|ରେଡିସ୍/gi, "Redis"],

  // Kafka
  [/काफ़्का|काफ्का|ಕಾಫ್ಕಾ|காஃப்கா|కాఫ్కా|കാഫ്ക|কাফকা|કાફકા|ਕਾਫਕਾ|କାଫକା/gi, "Kafka"],

  // Observability
  [/माइक्रोमीटर/gi, "Micrometer"],
  [/प्रोमेथियस|ಪ್ರೊಮಿಥಿಯಸ್/gi, "Prometheus"],
  [/ग्राफाना|ಗ್ರಾಫಾನಾ/gi, "Grafana"],
  [/बकेट-फॉर-जे/gi, "Bucket4j"],

  // Android, APIs, Mobile
  [/एपीआई|ஏபிஐ|ఏపీఐ/gi, "APIs"],
  [/एंड्रॉइड|एण्ड्रॉयड|ಆಂಡ್ರಾಯ್ಡ್|ஆண்ட்ராய்டு|ఆండ్రాయిడ్|ആൻഡ്രോയിഡ്|अँड्रॉइड|অ্যান্ড্রয়েড|એન્ડ્રોઇડ|ਐਂਡਰਾਇਡ|ଆଣ୍ଡ୍ରଏଡ୍/gi, "Android"],
  [/एमवीवीएम|ఎంవీవీఎం|ಎಂವಿವಿಎಂ|எம்விவிஎம்|ਐਮਵੀਵੀਐਮ/gi, "MVVM"],
  [/एनएफसी|ಎನ್‌ಎಫ್‌ಸಿ|என்எஃப்சி|ఎన్‌ఎఫ్‌సీ|എൻഎഫ്സി|এনএফসি|એનએફસી|ਐਨਐਫਸੀ|ଏନଏଫସି/gi, "NFC"],
  [/क्यूआर|ಕ್ಯೂಆರ್|க்யூஆர்|কিউআর/gi, "QR"],
  [/पीओएस/gi, "POS"],
  [/एसडीके/gi, "SDKs"],
  [/ऑस्टेलो/gi, "Ostello"],
  [/ब्लूपएक्स/gi, "BlupX"],
  [/रिवरपॉड/gi, "Riverpod"],
  [/रेज़रपे/gi, "Razorpay"],

  // AI & Projects
  [/टॉकिंगयूट्यूब|टॉकिंग-यूट्यूब|ಟಾಕಿಂಗ್\s*ಯೂಟ್ಯೂಬ್|டாக்கிங்\s*யூடியூப்|టాకింగ్\s*యూట్యూబ్|ടോക്കിങ്\s*യൂട്യൂബ്|टॉकिंग\s*यूट्यूब|টকিং\s*ইউটিউব|ટોકિંગ\s*યુટ્યુબ|ਟਾਕਿੰਗ\s*ਯੂਟਿਊਬ|ଟକିଂ\s*ୟୁଟ୍ୟୁବ୍/gi, "TalkingYouTube"],
  [/यूट्यूब|യൂട്യൂബ്|యూట్యూబ్|யூடியூப்|ಯೂಟ್ಯೂಬ್|ইউটিউব|યુટ્યુબ|ਯੂਟਿਊਬ|ୟୁଟ୍ୟୁବ୍/gi, "YouTube"],
  [/लैंगचेन/gi, "LangChain"],
  [/एफएआईएसएस/gi, "FAISS"],
  [/क्यूब-ट्रांजिट|क्यूबट्रांजिट्|ಕ್ಯೂಬ್-ಟ್ರಾನ್ಸಿಟ್|క్యూబ్-ట్రాన్సిట్|ക്യൂബ്-ട്രാൻസിറ്റ്|क्युब-ट्रान्झिट|কিউবট্রানজিট|ક્યુબટ્રાન્ઝિટ|ਕਯੂਬ-ਟ੍ਰਾਂਜਿਟ|କ୍ୟୁବ୍-ଟ୍ରାଞ୍ଜିଟ୍/gi, "KubeTransit"],
  [/कुबरनेट्स|कुबरनेट्सवरील|ಕುಬರ್ನೆಟಿಸ್|குபர்நெட்டீஸ்|కుబెర్‌నెటీస్|കുബർനെറ്റിസ്|কুবারনেটিস|કુબરનેટ્સ|ਕੁਬਰਨੇਟਿਸ|କୁବର୍ଣ୍ଣେଟିସ୍/gi, "Kubernetes"],
  [/के3एस/gi, "k3s"],
  [/लिंक्डइन|ಲಿಂಕ್ಡ್‌ಇನ್|లింక్డ్‌ఇన్/gi, "LinkedIn"],
  [/गिटहब/gi, "GitHub"],
  [/जेनरेटिव\s*एआई|जैनरेटिव\s*एआई|ଜେନେରେଟିଭ୍\s*ଏଆଇ|ਜੈਨਰੇਟਿਵ\s*ਏਆਈ|જનરેટિવ\s*એઆઈ|জেনারেটিভ\s*এআই|ജനറേറ്റീവ്\s*എഐ|జెనరేటివ్\s*ఏఐ|ஜெனரேட்டிவ்\s*ஏஐ|ಜನರೇಟಿವ್\s*ಎಐ|जनरेटिव्ह\s*एआय/gi, "Generative AI"],
  [/एक्सेंचर|अ‍ॅक्सेंचरमध्ये|એક્સેન્ચરમાં|ਐਕਸੈਂਚਰ|ಅಕ್ಸೆಂ\s*oliveಚರ್‌ನಲ್ಲಿ|ಅಕ್ಸೆಂ\s*oliveಚರ್|அக்சென்ச்சரில்|యాక్సెంట్చర్‌లో|ആക്സെഞ്ചറിൽ|অ্যাকসেন্টারে|ଆକ୍ସେଞ୍ଚର୍ରେ|एक्सेञ्चर्/gi, "Accenture"],
  [/पोर्टफोलियो|पोर्टफोलिओ/gi, "portfolio"],
  [/ओपन-सोर्स|ओपन\s*सोर्स/gi, "open-source"],
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

main().catch(console.error);
