# APProva+ — Xiaomi startup recording regression (2026-10-30)

## Proof
User-supplied 9.0 second Xiaomi recording shows: launcher icon -> native Chrome/WebAPK dark navy screen with only square mascot -> brief white screen -> learning UI. The previously approved complete splash art was never visible, despite the image asset being available on the production domain.

## Root cause
`app/page.js` renders `Loading` only until the initial `useEffect` sets `ready=true`. React hydration removes that component almost immediately, so the custom splash never remains on-screen long enough to be seen. Chrome's **native** splash is a separate system screen that a PWA cannot replace via HTML/Next.js.

## Minimal corrective change
- `app/layout.js`: introduce one SSR-rendered `div.apronsoLaunchOverlay` before the app content, hidden from assistive technology and standard browser tabs.
- `app/launch-splash.css`: show this overlay only in installed `display-mode:standalone/fullscreen`. Display the exact previously approved PNG image, unmodified. Use fixed positioning + highest stacking order + deep navy background. Keep it visible during hydration for 1200 ms, then hide instantly using a one-shot CSS animation. Do not depend on Javascript timers, do not introduce transitions/fade, and do not change installed PWA identity, Android icons, student data or grading.
- Add explicit regression tests for source structure and browser normal-mode behavior.
- Ensure the existing `Loading` fallback still displays the same art if the client bundle has not loaded when the overlay finishes.

## Important limits
The **first system screen** (Chrome/WebAPK) still shows icon only, as Android controls it. The requested full-image startup can be reliably presented only in the subsequent **web-rendered** startup stage. Exact control of the first native screen would require an Android app or dedicated wrapper, which is not included in this hotfix. Verify visually on the Xiaomi before claiming complete success. This overlay intentionally adds a minimum 1.2-second branding interval; measure launch responsiveness before making it permanent.

## Gates
- Browser, unit, technical, build; verify screenshots in installed display mode (desktop Playwright browser checks alone cannot emulate the native Xiaomi splash)
- Original PNG hashes unchanged; no modifications to `public/icons`, `manifest`, favicon, CSS art content or media sizes.
