-- =============================================================================
-- Khoá ghi bucket Storage vocab-audio (25/11/2026). Idempotent.
-- Trước đây role public (kể cả anon) được INSERT/UPDATE mọi file trong vocab-audio, không giới hạn
-- dung lượng/kiểu file → ai có anon key cũng upload được file tuỳ ý hoặc thay audio của từ vựng.
-- Sau migration: đọc vẫn công khai; chỉ admin (public.is_admin) được ghi — giống 3 bucket media khác.
-- scripts/generate_ai_audio.py và scripts/auto_fill_vocab_audio.js gửi JWT admin qua biến môi
-- trường RUSI_ADMIN_JWT.
-- =============================================================================
drop policy if exists "Public Insert for vocab-audio" on storage.objects;
drop policy if exists "Public Update for vocab-audio" on storage.objects;

drop policy if exists "Admins Manage Media Objects" on storage.objects;
create policy "Admins Manage Media Objects" on storage.objects
  for all to authenticated
  using (bucket_id = any (array['writing-images', 'listening-audio', 'trki-audio', 'vocab-audio'])
         and public.is_admin((select auth.uid())))
  with check (bucket_id = any (array['writing-images', 'listening-audio', 'trki-audio', 'vocab-audio'])
              and public.is_admin((select auth.uid())));

update storage.buckets
   set file_size_limit = 5242880, -- 5 MB
       allowed_mime_types = array['audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/x-wav',
                                  'audio/webm', 'audio/mp4', 'audio/x-m4a', 'audio/aac']
 where id = 'vocab-audio';
