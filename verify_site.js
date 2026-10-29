const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(htmlPath, 'utf8');

console.log('--- VERIFYING INDEX.HTML (MUSIC PAGE RESTORED + NEW SONG IN APP NEZUMI) ---');

// 1. Check user's requested strings
const checkStrings = [
  // New song announcement
  "New song added in app Nezumi",
  "Close your eyes, meri jaan. 🎧",
  "Whispers In The Moonlight",
  "Listen to my song 🎵🎧",

  // Scene 3: Letter
  "From My Heart to Yours ❤️🌙",
  "Meri Pyaari Jaan… 🥹🎀",
  "Baby, pata hai, aaj maine aapke liye vrat rakha hu 🥺❤️",
  "Karwa Chauth par wives apne husbands ki lambi umar ke liye vrat rakhti hain",
  "Main bhi toh aapse utna hi pyaar karta hoon, meri jaan",
  "Aap mere liye vrat nahi rakh paayi, and that's completely okay, baby🥹",
  "Bas aaj chaand ko dekhte hue ek chhota sa sapna dekha",
  "Happy Karwa Chauth, meri pyaari jaan. Aap hamesha khush raho, healthy raho, haste raho",
  "I love you more than these words can ever explain, meri jaan",

  // Scene 5: Water Ritual (Kaash Aap Yahin Hoti)
  "Kaash Aap Yahin Hoti… 🥹❤️",
  "Meko paani pilao, meri jaan 💧",
  "Meri jaan, Karwa Chauth ki woh rasam dekho toh kitni pyaari lagti hai na?",
  "Aur aaj maine socha… agar main aapke liye vrat rakh sakta hoon",
  "Main thoda sa aapki taraf jhukoon, aap pyaar se mujhe paani pilao",
  "Aaj toh ye sab sirf imagination mein hai, aur is chhoti si website mein humara virtual moment",
  "Tab tak, is virtual moment ko humare us din ke liye sambhaal ke rakhte hain",

  // Scene 6: Project Nezumi
  "🌸 PROJECT NEZUMI ⚡",
  "Happy Karwa Chauth, Meri Jaan. 🌙❤️",
  "No distance between us. No phone screen to hold.",
  "Bas aap aur main… aapka haath mere haath mein, aapki smile mere saamne",
  "Aaj meri preyyaapke liye thi. Kal bhi hogi.",
  "One moon. Two hearts. Different places, one little universe. ❤️",
  "nezuko ke liye mai apke zenitsuuuu 🌸⚡❤️",
  "Experience Our Little Universe Again ↺"
];

let missing = [];
checkStrings.forEach(str => {
  const cleanStr = str.replace(/\s+/g, ' ').trim();
  const cleanContent = content.replace(/\s+/g, ' ');
  if (!cleanContent.includes(cleanStr)) {
    missing.push(str);
  }
});

if (missing.length === 0) {
  console.log('✅ ALL requested strings (including "New song added in app Nezumi") are verified!');
} else {
  console.error('❌ Missing strings:', missing);
}

// 2. Verify IDs and Elements
const getElementByIdRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const usedIds = new Set();
while ((match = getElementByIdRegex.exec(content)) !== null) {
  usedIds.add(match[1]);
}

let missingIds = [];
usedIds.forEach(id => {
  const idRegex = new RegExp(`id=["']${id}["']`);
  if (!idRegex.test(content)) {
    missingIds.push(id);
  }
});

if (missingIds.length === 0) {
  console.log(`✅ All ${usedIds.size} JavaScript getElementById references match elements in HTML!`);
} else {
  console.error('❌ Unmatched IDs in JS:', missingIds);
}

// 3. Verify exactly 6 scenes exist
for (let s = 1; s <= 6; s++) {
  if (content.includes(`id="scene-${s}"`)) {
    console.log(`✅ Scene ${s} exists`);
  } else {
    console.error(`❌ Scene ${s} missing`);
  }
}
