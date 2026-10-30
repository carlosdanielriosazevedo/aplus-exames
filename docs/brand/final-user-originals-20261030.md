# Final approved assets - October 30 2026

**Source of truth (no reconstruction):**
- Android icon: `assets/brand/icon_1024_transparente-20261030.png`; original from user's ZIP; SHA256 `4633bc702311f8c3b9fc21ab02aad686ffff05537487407b8205681a5ee8fb97`.
- Startup image: `public/brand/approva-splash-user-exact-20261030.png`; original uploaded screenshot 941×1672 copied byte-for-byte; SHA256 `66decac9b2a5475ec21813c29c6d343c2683b46102ebefe55868c47e9dc6f957`.

Exports are reproducible with `python scripts/export-approved-brand.py` using Pillow 11.3.0 and compare with hardcoded SHA256 digests. Android any and maskable variants are identical, full-bleed, with transparent outer corners; this is deliberate to prevent the oversized navy border rejected by the user. A circular Android launcher may crop near-edge artwork, and this needs real-device validation.

The complete splash is painted unmodified as a CSS background using `contain` rather than `cover`, so it cannot be cropped by the viewport. The WebAPK native first screen is controlled by Chrome/Android and cannot be pixel-identically replaced by a PWA; the selected image is the internal startup screen. Do not promise a native splash unless implementing a native shell.

No grading, sessions, XP, account, databases, pedagogy or payments changed. Do not publish before Beta CI passes and real Xiaomi visual check.

Export workflow success: `41142984945`. Generated assets committed by GitHub Actions, checked against original-image SHA-256 and deterministic resized-output SHA-256. Beta CI must run on the final commit, not only on the initial source-asset commit.
