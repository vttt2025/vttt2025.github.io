---
name: ecc
description: Agent Harness Performance Optimization System based on affaan-m/ecc. Enforces Plan -> Implement -> Review -> Verify engineering cycle, immutability, boundary security, and specialized agent perspectives on every request.
---

# ECC (Agent Harness Performance Optimization System)

> Source: [https://github.com/affaan-m/ecc](https://github.com/affaan-m/ecc) by Affaan Mustafa

## What is ECC?

ECC provides structured engineering workflows, review standards, and autonomous agent roles to ensure high-performance, secure, and clean code delivery.

## Core Rules for Every Turn

1. **Research & Reuse:**
   - Always search codebase for existing components, CSS variables, and helpers before creating new ones.
2. **Immutability:**
   - Prefer pure functions and immutable data transforms over in-place object mutation.
3. **Surgical Execution:**
   - Make the smallest effective changes. Do not touch or reformat unrelated code.
4. **Boundary Validation & Sanitization:**
   - Sanitize all text before rendering to DOM via `esc()` or safe text nodes to prevent XSS.
   - Enforce authentication and RLS checks on data mutations.
5. **Quality Review Checklist:**
   - New functions are small and focused; existing large files are not split unless asked.
   - No new empty `catch` blocks for errors that can lose data; failures are surfaced clearly.
   - No hardcoded secrets or environment credentials.
   - Changes verified with syntax checks (`node -c`), diff inspection, and visual/viewport evaluation.
