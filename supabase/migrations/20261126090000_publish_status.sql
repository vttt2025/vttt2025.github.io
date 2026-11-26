-- Xuất bản nội dung: ghi lại kết quả gửi tín hiệu tới GitHub để CMS cảnh báo khi xuất bản không chạy
-- (thiếu token trong Vault, GitHub từ chối token...). Trước đây pg_net gửi bất đồng bộ, lỗi không ai thấy.
alter table public.content_publish_state add column if not exists last_request_id bigint;
alter table public.content_publish_state add column if not exists last_error text;

-- Vá trigger: lưu id yêu cầu pg_net; thiếu token thì ghi lỗi (idempotent: chỉ vá khi chưa vá)
do $mig$
declare
  d text := pg_get_functiondef('public.rusi_mark_content_changed()'::regprocedure);
  o text := d;
begin
  if position('last_request_id' in d) = 0 then
    d := replace(d, E'declare\n  v_token text;', E'declare\n  v_token text;\n  v_req bigint;');
    d := replace(d, 'perform net.http_post(', 'v_req := net.http_post(');
    d := replace(d,
      E'        );\n      end if;\n    end if;',
      E'        );\n        update public.content_publish_state set last_request_id = v_req, last_error = null where id = 1;\n      else\n        update public.content_publish_state set last_request_id = null, last_error = ''Thiếu token github_publish_token trong Vault'' where id = 1;\n      end if;\n    end if;');
    if d = o or position('last_request_id = v_req' in d) = 0 or position('v_req bigint' in d) = 0 then
      raise exception 'rusi_mark_content_changed: không vá được (thân hàm đã khác dự kiến)';
    end if;
    execute d;
  end if;
end
$mig$;

-- Trạng thái xuất bản gần nhất (chỉ admin): thời điểm gửi, mã HTTP GitHub trả về, lỗi
create or replace function public.rusi_publish_status()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_state record;
  v_status int;
  v_err text;
  v_found boolean := false;
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Chỉ quản trị viên được xem trạng thái xuất bản' using errcode = '42501';
  end if;
  select last_dispatch_at, last_request_id, last_error into v_state from public.content_publish_state where id = 1;
  if v_state.last_request_id is not null then
    select status_code, error_msg into v_status, v_err from net._http_response where id = v_state.last_request_id;
    v_found := found;
  end if;
  return jsonb_build_object(
    'last_dispatch_at', v_state.last_dispatch_at,
    'error', v_state.last_error,
    'pending', v_state.last_request_id is not null and not v_found,
    'status_code', v_status,
    'error_msg', v_err
  );
end;
$$;
revoke all on function public.rusi_publish_status() from public, anon;
grant execute on function public.rusi_publish_status() to authenticated;
