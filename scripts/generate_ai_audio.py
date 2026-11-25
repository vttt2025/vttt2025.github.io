import asyncio
import json
import os
import aiohttp
import edge_tts

ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaHRkd2ppaG5sYXhyYml0bWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1ODk5MjgsImV4cCI6MjEwODE2NTkyOH0.qMGTYhVyoyht7jrBCSN2VczeqShmsBedC-Qdg_C5-FI"
STORAGE_UPLOAD_BASE = "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/vocab-audio/"
STORAGE_PUBLIC_BASE = "https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/vocab-audio/"
# Bucket vocab-audio chỉ cho admin ghi: đặt RUSI_ADMIN_JWT = access_token của tài khoản admin
# (đăng nhập admin.html → DevTools → localStorage "sb-nrhtdwjihnlaxrbitmcf-auth-token" → access_token, hết hạn sau ~1 giờ).
ADMIN_JWT = os.environ.get("RUSI_ADMIN_JWT", "").strip()

async def process_word(word, session, semaphore, results, progress):
    async with semaphore:
        hex_name = word.encode('utf-8').hex()
        filename = f"ru_ai_{hex_name}.mp3"
        tmp_file = f"temp_tts_{hex_name}.mp3"
        public_url = f"{STORAGE_PUBLIC_BASE}{filename}"

        try:
            # 1. Generate MP3 with Edge Neural TTS
            communicate = edge_tts.Communicate(word, 'ru-RU-SvetlanaNeural')
            await communicate.save(tmp_file)

            # 2. Upload to Supabase Storage
            with open(tmp_file, 'rb') as f:
                data = f.read()

            upload_url = f"{STORAGE_UPLOAD_BASE}{filename}"
            headers = {
                "apikey": ANON_KEY,
                "Authorization": f"Bearer {ADMIN_JWT}",
                "Content-Type": "audio/mpeg",
                "x-upsert": "true"
            }
            async with session.post(upload_url, data=data, headers=headers) as resp:
                if resp.status in (200, 201):
                    results[word] = public_url
                else:
                    text = await resp.text()
                    print(f"\n[Upload Error] {word}: {resp.status} - {text}")
        except Exception as e:
            print(f"\n[Error] {word}: {e}")
        finally:
            if os.path.exists(tmp_file):
                try:
                    os.remove(tmp_file)
                except Exception:
                    pass
            progress[0] += 1
            if progress[0] % 25 == 0 or progress[0] == progress[1]:
                print(f"AI TTS Progress: {progress[0]}/{progress[1]} words processed ({(progress[0]/progress[1]*100):.1f}%)", end='\r')

async def main():
    if not ADMIN_JWT:
        raise SystemExit("Thiếu biến môi trường RUSI_ADMIN_JWT (JWT tài khoản admin) — bucket vocab-audio chỉ cho admin ghi.")
    with open('still_missing_words.json', 'r', encoding='utf-8') as f:
        words = json.load(f)

    print(f"Generating and uploading AI audio for {len(words)} Russian words...")
    results = {}
    progress = [0, len(words)]
    semaphore = asyncio.Semaphore(15)  # 15 concurrent uploads

    connector = aiohttp.TCPConnector(limit=30)
    async with aiohttp.ClientSession(connector=connector) as session:
        tasks = [process_word(w, session, semaphore, results, progress) for w in words]
        await asyncio.gather(*tasks)

    print(f"\nFinished! Successfully generated and uploaded {len(results)}/{len(words)} audio files.")
    with open('ai_generated_audio_map.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    asyncio.run(main())
