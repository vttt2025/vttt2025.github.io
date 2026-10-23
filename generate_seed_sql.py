import json, uuid, re, sys, unicodedata
sys.stdout.reconfigure(encoding='utf-8')

with open('parsed_topics_and_vocabs.json', 'r', encoding='utf-8') as f:
    topics = json.load(f)

def sql_str(val):
    if val is None:
        return "NULL"
    s = str(val).strip()
    escaped = s.replace("'", "''")
    return f"'{escaped}'"

def sql_json(obj):
    if obj is None:
        return "'[]'::jsonb"
    j = json.dumps(obj, ensure_ascii=False)
    escaped = j.replace("'", "''")
    return f"'{escaped}'::jsonb"

sql_statements = []
sql_statements.append("-- ======================================================================")
sql_statements.append("-- SEED DATA: 10 CHỦ ĐỀ & 333 TỪ VỰNG TIẾNG NGA")
sql_statements.append("-- ======================================================================\n")

vocab_inserts = []
jar_inserts = []

for topic in topics:
    topic_id = str(uuid.uuid4())
    topic["id"] = topic_id
    code = topic["code"]
    name = topic["name"]
    level = topic.get("level", "A1")
    icon = topic.get("icon", "🫙")
    desc = topic.get("desc", "")
    sub_topics = topic.get("sub_topics", [])
    
    words_summary = []
    
    for w in topic["words"]:
        vocab_id = str(uuid.uuid4())
        w["id"] = vocab_id
        
        ru = w["ru"]
        normalized = unicodedata.normalize('NFD', ru)
        cleaned = "".join(c for c in normalized if unicodedata.category(c) != 'Mn')
        word_norm = unicodedata.normalize('NFC', cleaned).strip().lower()
        # Clean any extra symbols from word_norm
        word_norm = re.sub(r'[^\w\s-]', '', word_norm)
        
        vi = w["vi"]
        pos = w.get("pos", "Noun")
        gender = w.get("gender")
        sub_topic = w.get("sub_topic", "")
        examples = w.get("examples", [])
        ex_ru = w.get("example_ru", "")
        ex_vi = w.get("example_vi", "")
        collocations = w.get("collocations", {})
        note = w.get("note", "")
        
        # Determine aspect for verbs if applicable
        aspect = None
        if pos == "Verb":
            if " / " in ru:
                aspect = "ipfv/pfv"
            elif "по" in ru or "с" in ru:
                aspect = "pfv"
            else:
                aspect = "ipfv"
                
        vocab_inserts.append(f"""INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '{vocab_id}', {sql_str(ru)}, {sql_str(word_norm)}, {sql_str(pos)}, {sql_str(gender)}, {sql_str(aspect)}, {sql_str(vi)},
  '{topic_id}', {sql_str(code)}, {sql_str(sub_topic)}, {sql_json(examples)}, {sql_str(ex_ru)}, {sql_str(ex_vi)},
  {sql_json(collocations)}, {sql_str(level)}, NOW(), NOW()
);""")

        words_summary.append({
            "vocab_id": vocab_id,
            "ru": ru,
            "stress": ru,
            "vi": vi,
            "pos": pos,
            "gender": gender,
            "sub_topic": sub_topic,
            "note": note,
            "ex": f"{ex_ru} ({ex_vi})" if ex_ru and ex_vi else ex_ru
        })

    jar_inserts.append(f"""INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '{topic_id}', {sql_str(name)}, {sql_str(code)}, {sql_str(level)}, {sql_str(icon)}, {sql_str(desc)}, true,
  {sql_json(sub_topics)}, {len(topic['words'])}, {sql_json(words_summary)}, NOW()
);""")

print(f"Generated {len(jar_inserts)} topic inserts and {len(vocab_inserts)} vocabulary inserts.")

with open('seed_supabase_topics_and_vocabs.sql', 'w', encoding='utf-8') as out:
    out.write("\n".join(sql_statements))
    out.write("\n-- 1. CHÈN BẢNG CHỦ ĐỀ (VOCAB_JARS)\n")
    out.write("\n".join(jar_inserts))
    out.write("\n\n-- 2. CHÈN BẢNG TỪ VỰNG (VOCABULARIES)\n")
    out.write("\n".join(vocab_inserts))

print("Saved to seed_supabase_topics_and_vocabs.sql successfully.")
