const fs = require('fs');
const path = require('path');

function cleanRussianWord(str) {
  if (!str) return '';
  return str
    .replace(/[\u0300-\u036f́̀]/g, '')
    .replace(/[«»""''„“]/g, '')
    .replace(/^[(\[]|[)\]]$/g, '')
    .trim()
    .toLowerCase();
}

const audioMapPath = path.join(__dirname, '..', 'data', 'wikimedia_audio_map.json');
if (!fs.existsSync(audioMapPath)) {
  console.error('Missing wikimedia_audio_map.json!');
  process.exit(1);
}

const audioMap = JSON.parse(fs.readFileSync(audioMapPath, 'utf8'));
console.log(`Loaded ${Object.keys(audioMap).length} audio mappings.`);

// 1. UPDATE data.js
const dataJsPath = path.join(__dirname, '..', 'data.js');
let dataContent = fs.readFileSync(dataJsPath, 'utf8');

// Parse VOCAB_JARS
const startJars = dataContent.indexOf('const VOCAB_JARS = ') + 'const VOCAB_JARS = '.length;
const endJars = dataContent.indexOf(';\n\nconst VOCABULARIES =');
if (startJars === -1 || endJars === -1) {
  console.error('Could not locate VOCAB_JARS in data.js');
  process.exit(1);
}
const jars = JSON.parse(dataContent.slice(startJars, endJars));

let jarWordsTotal = 0;
let jarWordsMatched = 0;

jars.forEach(jar => {
  (jar.words || []).forEach(w => {
    jarWordsTotal++;
    const key = cleanRussianWord(w.word_normalized || w.ru || w.word_with_stress);
    if (audioMap[key]) {
      w.audio_url = audioMap[key];
      w.audio = audioMap[key];
      jarWordsMatched++;
    }
  });
});

console.log(`VOCAB_JARS: ${jarWordsMatched} / ${jarWordsTotal} words updated with audio (${((jarWordsMatched / jarWordsTotal) * 100).toFixed(1)}%)`);

// Parse VOCABULARIES
const startVocabs = dataContent.indexOf('const VOCABULARIES = ') + 'const VOCABULARIES = '.length;
const endVocabs = dataContent.indexOf(';\n\nconst TOPIC_ARTICLES =');
if (startVocabs === -1 || endVocabs === -1) {
  console.error('Could not locate VOCABULARIES in data.js');
  process.exit(1);
}
const vocabs = JSON.parse(dataContent.slice(startVocabs, endVocabs));

let vocabsTotal = vocabs.length;
let vocabsMatched = 0;

vocabs.forEach(v => {
  const key = cleanRussianWord(v.word_normalized || v.ru || v.word_with_stress);
  if (audioMap[key]) {
    v.audio_url = audioMap[key];
    v.audio = audioMap[key];
    vocabsMatched++;
  }
});

console.log(`VOCABULARIES: ${vocabsMatched} / ${vocabsTotal} dictionary items updated with audio (${((vocabsMatched / vocabsTotal) * 100).toFixed(1)}%)`);

// Reconstruct data.js
const newJarsJson = JSON.stringify(jars, null, 2);
const newVocabsJson = JSON.stringify(vocabs, null, 2);

dataContent = dataContent.slice(0, startJars) + newJarsJson + ';\n\nconst VOCABULARIES = ' + newVocabsJson + dataContent.slice(endVocabs);
fs.writeFileSync(dataJsPath, dataContent, 'utf8');
console.log('Successfully wrote updated VOCAB_JARS and VOCABULARIES to data.js');

// 2. UPDATE data/supabase-backup.json
const backupPath = path.join(__dirname, '..', 'data', 'supabase-backup.json');
if (fs.existsSync(backupPath)) {
  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  if (backup.tables && backup.tables.vocab_jars) {
    backup.tables.vocab_jars.forEach(jar => {
      (jar.words || []).forEach(w => {
        const key = cleanRussianWord(w.word_normalized || w.ru || w.word_with_stress);
        if (audioMap[key]) {
          w.audio_url = audioMap[key];
          w.audio = audioMap[key];
        }
      });
    });
  }
  if (backup.tables && backup.tables.vocabularies) {
    backup.tables.vocabularies.forEach(v => {
      const key = cleanRussianWord(v.word_normalized || v.ru || v.word_with_stress);
      if (audioMap[key]) {
        v.audio_url = audioMap[key];
        v.audio = audioMap[key];
      }
    });
  }
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2), 'utf8');
  console.log('Successfully updated data/supabase-backup.json with audio URLs');
}
