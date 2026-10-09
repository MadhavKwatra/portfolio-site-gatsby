---
date: '2026-05-27'
title: 'Software Engineer Intern'
company: 'BoostOwl'
location: 'India'
range: 'May 2026 - Present'
url: 'https://boostowl.io/'
---

- Built BoostOwl's installable mobile app (PWA) by rebuilding every screen for phones in React (318 components, offline start, safe updates), so shop owners run orders, stock and chats from a phone while desktop stayed unchanged.
- Ended random user logouts by redesigning refresh-token rotation in Node.js, PostgreSQL and Redis (atomic rotation, short grace window, one refresh shared across tabs) without weakening token-theft protection.
- Designed batch-level inventory with FIFO / expiry-first stock allocation and stock reservation across 12 PostgreSQL migrations, and fixed a GST rounding bug that billed a ₹200 order as ₹199.99.
- Built Web Push notifications and an in-app action list on Kafka events, so staff learn about new chats, orders and payments even with the app closed.
- Shipped 11 PRs using Claude Code and Cursor while owning design, review and testing: fixed 129 code-review findings, each with a test that failed first, and added 1,030+ test files (Vitest, Playwright).
