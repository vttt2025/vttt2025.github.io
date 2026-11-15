# ECC (Agent Harness Performance Optimization System) — Workspace Rules

> Based on the ECC framework by Affaan Mustafa ([github.com/affaan-m/ecc](https://github.com/affaan-m/ecc))
> Integrated into every request for Antigravity AI Agent.

---

## 1. Core Principles

1. **Research & Reuse First:** Search the codebase and standard web platform libraries before hand-rolling new implementations. Prefer battle-tested helpers over net-new code.
2. **Plan Before Execute:** Outline changes, verify dependencies, and assess risks before modifying code.
3. **Immutability (Critical):** Always create new objects, avoid mutating shared state in-place.
4. **Boundary Input Validation:** Validate and sanitize all external inputs (URL queries, hash, forms, localStorage, postMessage, external APIs) at boundaries.
5. **Fail Loudly & Gracefully:** Never silently swallow critical errors (`catch (_) {}`). Surface clear, user-friendly errors in UI and meaningful logs in development.
6. **Zero Secrets:** Never hardcode API keys, service tokens, passwords, or credentials in client-side code or git commits.
7. **Targeted Verification:** Always verify syntax (`node -c`), inspect diffs (`git diff`), and test across responsive breakpoints before completing a turn.

---

## 2. ECC Autonomous Cycle (Plan -> Implement -> Review -> Verify)

```
[User Request]
       │
       ▼
1. Plan / Research
   ├── Audit current codebase patterns
   └── Define minimal surgical plan
       │
       ▼
2. Implement
   ├── Surgical edits only
   ├── Immutable data patterns
   └── High cohesion, small focused functions (<50 lines)
       │
       ▼
3. Review (Agent-First Self-Audit)
   ├── Code Quality (KISS, DRY, no dead code introduced)
   ├── Security (XSS sanitization, secret isolation, auth/RLS boundary)
   └── Responsive / Accessibility (WCAG contrast, touch targets >= 44px)
       │
       ▼
4. Verify
   ├── Run syntax & type checks (`node -c`, linters)
   ├── Check git diff for unintended side-effects
   └── Confirm success criteria met
```

---

## 3. Specialized ECC Perspectives for Every Request

- **`ecc:planner`:** Automatically analyze complexity, outline the smallest complete change, and anticipate breaking changes before editing.
- **`ecc:code-reviewer`:** Inspect code immediately after writing: ensure idiomatic style, eliminate code smells (deep nesting > 4 levels, magic numbers), keep files maintainable (<800 lines).
- **`ecc:security-reviewer`:** Validate input boundaries, ensure XSS escaping via `esc()`, verify RLS protection on Supabase queries, enforce zero-secret policy.
- **`ecc:performance-optimizer`:** Enforce 0-Egress architecture (split heavy collections into `data/modules/*.json`, leverage IndexedDB offline-first cache via `RusiDataLoader`, never fetch full-table dumps on page load), minimize DOM payloads, eliminate unnecessary re-renders, optimize asset sizes and caching.
- **`ecc:a11y-architect`:** Ensure accessible HTML semantics, keyboard navigation, clear ARIA labels, and WCAG-compliant color contrast.
