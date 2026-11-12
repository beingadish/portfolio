import fs from "fs";
import path from "path";
import { translations } from "../app/data/translations.ts";

const API_KEY = process.env.SARVAM_API_KEY || "sk_m5q357zg_STs2tcWJuKwyvq6l53VCosQl";

const LANG_MAP = {
  en: "en-IN",
  hi: "hi-IN",
  sa: "hi-IN", // Sanskrit in Devanagari maps to hi-IN
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

// Clean text to avoid speech glitches or punctuation artifacts
function cleanTextForSpeech(text) {
  return text
    .replace(/["“”]/g, "")
    .replace(/[—–]/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function synthesizeText(text, targetLang) {
  const cleaned = cleanTextForSpeech(text);
  const response = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: [cleaned],
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

  return Buffer.from(data.audios[0], "base64");
}

async function main() {
  console.log("Starting Sarvam audio generation using direct translation definitions...");
  const langs = Object.keys(LANG_MAP);

  let totalCount = 0;
  let successCount = 0;
  let skipCount = 0;

  for (const lang of langs) {
    const targetLang = LANG_MAP[lang];
    const outDir = path.join("public", "audio", lang);
    fs.mkdirSync(outDir, { recursive: true });

    const dict = translations[lang];
    if (!dict || !dict.sectionBriefs) {
      console.warn(`No sectionBriefs for ${lang}`);
      continue;
    }

    const briefs = dict.sectionBriefs;
    console.log(`\n=== Processing Language: ${lang} (${targetLang}) [${briefs.length} briefs] ===`);

    for (const brief of briefs) {
      const { id, text } = brief;
      const outFile = path.join(outDir, `${id}.wav`);
      totalCount++;

      if (fs.existsSync(outFile) && fs.statSync(outFile).size > 1000) {
        console.log(`[SKIP] Already exists: ${outFile}`);
        skipCount++;
        continue;
      }

      console.log(`[SYNTHESIZING] ${lang} -> ${id} (${text.substring(0, 45)}...)...`);
      let attempts = 0;
      let ok = false;

      while (attempts < 3 && !ok) {
        attempts++;
        try {
          const audioBuffer = await synthesizeText(text, targetLang);
          fs.writeFileSync(outFile, audioBuffer);
          const sizeKb = (audioBuffer.length / 1024).toFixed(1);
          console.log(`  ✓ Saved ${outFile} (${sizeKb} KB)`);
          successCount++;
          ok = true;
          await sleep(250); // slight rate-limit buffer
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
  console.log(`Generation finished. Total: ${totalCount}, Synthesized: ${successCount}, Skipped: ${skipCount}`);
  console.log(`========================================\n`);
}

main().catch(console.error);
