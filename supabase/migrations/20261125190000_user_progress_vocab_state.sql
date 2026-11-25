-- Đồng bộ tiến độ từ vựng giữa các thiết bị (thẻ SRS, lọ cá nhân, từ đã thuộc, từ gắn sao).
-- Trước đây các dữ liệu này chỉ nằm trong localStorage → mất khi đổi máy/xoá dữ liệu trình duyệt.
-- Client (vocab-sync.js) ghi cả khối JSON; RLS hiện có của user_progress (chỉ dòng của mình) áp dụng.
-- Idempotent.

alter table public.user_progress
  add column if not exists vocab_state jsonb not null default '{}'::jsonb;

-- Chặn ghi khối quá lớn (≈1.5 MB) để bảo vệ quota.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'user_progress_vocab_state_size'
      and conrelid = 'public.user_progress'::regclass
  ) then
    alter table public.user_progress
      add constraint user_progress_vocab_state_size
      check (octet_length(vocab_state::text) <= 1500000);
  end if;
end $$;
