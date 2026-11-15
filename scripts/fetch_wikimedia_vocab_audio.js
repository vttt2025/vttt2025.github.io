const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

function cleanRussianWord(str) {
  if (!str) return '';
  return str
    .replace(/[\u0300-\u036f́̀]/g, '')
    .replace(/[«»""''„“]/g, '')
    .replace(/^[(\[]|[)\]]$/g, '')
    .trim();
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function queryMediaWiki(titles) {
  return new Promise((resolve, reject) => {
    const encodedTitles = titles.map(t => encodeURIComponent(t)).join('|');
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodedTitles}&redirects=1&prop=imageinfo&iiprop=url|size|mime&format=json`;

    const req = https.get(apiUrl, {
      headers: {
        'User-Agent': 'RusiTrkiEducationBot/1.0 (https://rusitrki.com; contact@rusitrki.com)'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error('Request timeout'));
    });
  });
}

function getMp3UrlFromImageInfo(page) {
  if (!page || !page.imageinfo || !page.imageinfo[0]) return null;
  const oggUrl = page.imageinfo[0].url;
  if (!oggUrl) return null;
  const filename = page.title.replace('File:', '').replace(/ /g, '_');
  // Form transcode MP3 URL
  const baseUrl = oggUrl.replace('https://upload.wikimedia.org/wikipedia/commons/', 'https://upload.wikimedia.org/wikipedia/commons/transcoded/');
  return `${baseUrl.split('?')[0]}/${encodeURIComponent(filename)}.mp3`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('--- 1. Loading data.js to extract vocabulary words ---');
  const dataJsPath = path.join(__dirname, '..', 'data.js');
  const dataJs = fs.readFileSync(dataJsPath, 'utf8');

  const sandbox = { window: {}, document: {}, console: console };
  vm.createContext(sandbox);
  const endIdx = dataJs.indexOf('const VOCAB_LESSONS');
  const codeSnippet = dataJs.substring(0, endIdx) + '\nwindow.VOCAB_JARS = VOCAB_JARS;\nwindow.VOCABULARIES = VOCABULARIES;';
  vm.runInContext(codeSnippet, sandbox);

  const jars = sandbox.window.VOCAB_JARS || [];
  const vocabs = sandbox.window.VOCABULARIES || [];

  const wordMap = new Map(); // cleanWord -> Array of original references

  jars.forEach((jar, jIdx) => {
    (jar.words || []).forEach((w, wIdx) => {
      const c = cleanRussianWord(w.word_normalized || w.ru || w.word_with_stress).toLowerCase();
      if (c) {
        if (!wordMap.has(c)) wordMap.set(c, []);
        wordMap.get(c).push({ type: 'jar', jarIdx: jIdx, wordIdx: wIdx, word: w });
      }
    });
  });

  vocabs.forEach((v, vIdx) => {
    const c = cleanRussianWord(v.word_normalized || v.ru || v.word_with_stress).toLowerCase();
    if (c) {
      if (!wordMap.has(c)) wordMap.set(c, []);
      wordMap.get(c).push({ type: 'vocab', vocabIdx: vIdx, word: v });
    }
  });

  const uniqueWords = Array.from(wordMap.keys());
  console.log(`Total unique Russian words extracted: ${uniqueWords.length}`);

  const audioResults = {}; // cleanWord -> mp3Url

  // Check if existing cache file exists
  const cachePath = path.join(__dirname, '..', 'data', 'wikimedia_audio_map.json');
  if (fs.existsSync(cachePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      Object.assign(audioResults, existing);
      console.log(`Loaded ${Object.keys(existing).length} existing audio mappings from cache.`);
    } catch (e) {
      console.warn('Could not read existing cache:', e.message);
    }
  }

  const wordsToFetch = uniqueWords.filter(w => !audioResults[w]);
  console.log(`Words remaining to query: ${wordsToFetch.length}`);

  // Query in chunks of 50
  const CHUNK_SIZE = 50;
  const missingAfterPass1 = [];

  console.log('\n--- 2. Pass 1: Querying File:Ru-{word}.ogg ---');
  for (let i = 0; i < wordsToFetch.length; i += CHUNK_SIZE) {
    const chunk = wordsToFetch.slice(i, i + CHUNK_SIZE);
    const titles = chunk.map(w => `File:Ru-${w}.ogg`);

    try {
      const resp = await queryMediaWiki(titles);
      const pages = resp.query ? resp.query.pages : {};
      const redirects = (resp.query && resp.query.redirects) || [];
      const redMap = {};
      redirects.forEach(r => { redMap[r.to] = r.from; });

      const foundInChunk = new Set();
      for (const pid in pages) {
        if (pid === '-1') continue;
        const page = pages[pid];
        let originalTitle = redMap[page.title] || page.title;
        const match = originalTitle.match(/^File:Ru-(.+)\.ogg$/i);
        if (match && match[1]) {
          const matchedWord = match[1].toLowerCase();
          const mp3 = getMp3UrlFromImageInfo(page);
          if (mp3) {
            audioResults[matchedWord] = mp3;
            foundInChunk.add(matchedWord);
          }
        }
      }

      chunk.forEach(w => {
        if (!foundInChunk.has(w)) {
          missingAfterPass1.push(w);
        }
      });

      process.stdout.write(`Pass 1: Processed ${Math.min(i + CHUNK_SIZE, wordsToFetch.length)}/${wordsToFetch.length} (Found so far: ${Object.keys(audioResults).length})\r`);
    } catch (err) {
      console.error(`\nError querying chunk starting at ${i}:`, err.message);
      chunk.forEach(w => missingAfterPass1.push(w));
    }

    await sleep(150); // Be respectful to Wikimedia
  }

  console.log(`\nPass 1 complete. Found: ${Object.keys(audioResults).length}. Missing: ${missingAfterPass1.length}`);

  if (missingAfterPass1.length > 0) {
    console.log('\n--- 3. Pass 2: Querying File:Ru-{Capitalized}.ogg for missing words ---');
    for (let i = 0; i < missingAfterPass1.length; i += CHUNK_SIZE) {
      const chunk = missingAfterPass1.slice(i, i + CHUNK_SIZE);
      const titles = chunk.map(w => `File:Ru-${capitalize(w)}.ogg`);

      try {
        const resp = await queryMediaWiki(titles);
        const pages = resp.query ? resp.query.pages : {};
        const redirects = (resp.query && resp.query.redirects) || [];
        const redMap = {};
        redirects.forEach(r => { redMap[r.to] = r.from; });

        for (const pid in pages) {
          if (pid === '-1') continue;
          const page = pages[pid];
          let originalTitle = redMap[page.title] || page.title;
          const match = originalTitle.match(/^File:Ru-(.+)\.ogg$/i);
          if (match && match[1]) {
            const matchedWord = match[1].toLowerCase();
            const mp3 = getMp3UrlFromImageInfo(page);
            if (mp3) {
              audioResults[matchedWord] = mp3;
            }
          }
        }
        process.stdout.write(`Pass 2: Processed ${Math.min(i + CHUNK_SIZE, missingAfterPass1.length)}/${missingAfterPass1.length} (Total found: ${Object.keys(audioResults).length})\r`);
      } catch (err) {
        console.error(`\nError in Pass 2 chunk starting at ${i}:`, err.message);
      }

      await sleep(150);
    }
  }

  // Save audio mapping to disk
  fs.mkdirSync(path.dirname(cachePath), { recursive: true });
  fs.writeFileSync(cachePath, JSON.stringify(audioResults, null, 2), 'utf8');
  console.log(`\n\nSaved audio mapping to ${cachePath}`);
  console.log(`Final Stats:`);
  console.log(`- Total Unique Words: ${uniqueWords.length}`);
  console.log(`- Words with Wikimedia Audio: ${Object.keys(audioResults).length} (${((Object.keys(audioResults).length / uniqueWords.length) * 100).toFixed(1)}%)`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
