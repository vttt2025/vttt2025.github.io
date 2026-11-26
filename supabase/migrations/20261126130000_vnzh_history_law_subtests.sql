-- Đề VNZh (trki_spec_vnzh_01): câu Lịch sử (TRKI_VNZH_HI_*) và Pháp luật (TRKI_VNZH_LA_*) bị gắn sub_test = 'reading'
-- → RPC chấm xếp chúng TRƯỚC phần Nghe, trong khi đề hiển thị (parts) xếp Nghe trước 2 module này
-- → 43 câu bị chấm lệch vị trí. Gắn nhãn riêng 'history' / 'law': RPC xếp nhãn ngoài danh sách sau phần Nghe theo
-- order_index (56–69 rồi 70–88), khớp đúng thứ tự parts, không đổi giao diện.
alter table public.trki_question_bank drop constraint if exists trki_question_bank_sub_test_check;
alter table public.trki_question_bank add constraint trki_question_bank_sub_test_check
  check (sub_test = any (array['lexis_grammar', 'reading', 'listening', 'writing', 'speaking', 'history', 'law']));

update public.trki_question_bank set sub_test = 'history', updated_at = now()
 where test_code = 'trki_spec_vnzh_01' and code like 'TRKI\_VNZH\_HI\_%' and sub_test = 'reading';
update public.trki_question_bank set sub_test = 'law', updated_at = now()
 where test_code = 'trki_spec_vnzh_01' and code like 'TRKI\_VNZH\_LA\_%' and sub_test = 'reading';
