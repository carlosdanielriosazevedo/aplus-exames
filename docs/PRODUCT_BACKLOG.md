# APProva+ — Product backlog

This file records product commitments explicitly approved by the product owner but deferred from the current implementation cycle.

## Pending

### Contextual Apronso animations

**Status:** approved and pending  
**Timing:** after the current core learning and Beta Candidate priorities  
**Goal:** make Apronso feel like a companion that reacts to the student's journey, rather than a static decorative image.

Initial animation set:

1. **Idle:** subtle breathing and occasional blinking.
2. **Thinking:** gentle head tilt and upward glance.
3. **Correct answer:** short jump and raised wing.
4. **Completion:** stronger celebration, optionally using the trophy pose.

Acceptance criteria:

- each animation has a clear contextual meaning;
- movement remains appropriate for students aged 14–18 and does not feel childish;
- animations are brief and do not run constantly across every screen;
- assets remain lightweight and smooth on typical mobile devices;
- `prefers-reduced-motion` is respected;
- the Apronso design stays visually consistent across all frames/states;
- static fallback remains available if an animation fails to load.

Implementation note: restrained CSS movement of the existing static images may be used temporarily, but the intended result is articulated animation (eyes, head and/or wings), using an appropriate lightweight format such as Rive, Lottie or optimized animated assets after prototype comparison.
