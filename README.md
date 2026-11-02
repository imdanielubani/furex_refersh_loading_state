# Furex Dashboard

The Furex mobile home dashboard, built with Expo and React Native. It features a custom branded **pull-to-refresh**: pull down from the top and a spinning Furex loading indicator appears above the balance card, pushing the content down while the dashboard reloads.

The indicator is also available on its own as a [Lottie animation](#lottie-animation), for use anywhere outside the app.

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Pull to refresh](#pull-to-refresh)
- [Lottie animation](#lottie-animation)
- [Data layer](#data-layer)
- [Design tokens and assets](#design-tokens-and-assets)
- [Accessibility](#accessibility)
- [Known limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Home dashboard**: greeting header, balance card with a hide/show toggle, deposit / trade / withdraw actions, service shortcuts, a swipeable promo carousel and a recent transactions empty state.
- **Custom pull-to-refresh**: rubber-band pull physics, a branded loading indicator, a haptic tap when the pull arms, and spring animations. Everything runs on the UI thread.
- **Floating tab bar**: a custom pill navigation bar built on Expo Router's headless tabs.
- **Standalone Lottie file** of the refresh and loading indicator.
- **Typed throughout** with strict TypeScript, and linted with the Expo ESLint config.

## Tech stack

| Area | Library | Version |
| --- | --- | --- |
| Framework | Expo SDK | 58 |
| Runtime | React Native | 0.88 |
| UI | React | 19.3 |
| Language | TypeScript (strict) | 6.0 |
| Navigation | Expo Router (file-based, headless tabs) | 58 |
| Animation | React Native Reanimated + Worklets | 4.7 / 0.13 |
| Gestures | React Native Gesture Handler | 3.3 |
| Images and SVG | expo-image | 58 |
| Fonts | expo-font, Sora, Montserrat | 58 |
| Haptics | expo-haptics | 58 |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (current LTS)
- The **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)), or an Android emulator / iOS simulator

### Install and run

```bash
git clone https://github.com/imdanielubani/furex_refersh_loading_state.git
cd furex_refersh_loading_state
npm install
npx expo start
```

Then:

- **On your phone**: scan the QR code with the Camera app (iOS) or from inside Expo Go (Android). Your phone and computer must be on the same Wi-Fi.
- **Android emulator**: press `a` in the terminal.
- **iOS simulator** (macOS only): press `i`.
- **Web**: press `w`, or run `npm run web`.

If your phone can't connect (for example on office Wi-Fi), use a tunnel:

```bash
npx expo start --tunnel
```

> **Tip:** Expo Go runs a development build, which is noticeably slower than a release build. Judge animation smoothness on a release or development build, ideally on a lower-end Android device.

Always add packages with `npx expo install <package>` rather than `npm install`. It picks the version that matches the Expo SDK.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` | Start and open on Android |
| `npm run ios` | Start and open on iOS |
| `npm run web` | Start and open in the browser |
| `npm run lint` | Lint with the Expo ESLint config |
| `npm run typecheck` | Type-check with `tsc --noEmit` |

## Project structure

```text
.
├── animations/
│   └── refresh-loading/
│       ├── refresh-loading.json        # Lottie: indicator with named segments
│       └── refresh-loading-plain.json  # Lottie: same animation, no labels
├── assets/
│   ├── icons/                          # SVG icons, rendered at intrinsic size
│   └── images/                         # Photos, logos, illustration parts, refresh ring
└── src/
    ├── app/                            # Expo Router routes (every file is a screen)
    │   ├── _layout.tsx                 # Root: fonts, splash screen, gesture root
    │   └── (tabs)/
    │       ├── _layout.tsx             # Headless tabs + custom bottom nav
    │       ├── index.tsx               # Home dashboard
    │       └── wallet / giftcards / cards / profile.tsx   # Placeholder tabs
    ├── components/
    │   ├── home/                       # Dashboard sections (header, balance card, ...)
    │   ├── navigation/BottomNav.tsx    # Floating pill tab bar
    │   ├── refresh/
    │   │   ├── PullToRefreshScrollView.tsx  # Gesture, physics, refresh lifecycle
    │   │   └── RefreshIndicator.tsx         # The animated indicator
    │   ├── ui/Icon.tsx                 # Centres an SVG at its intrinsic size
    │   └── PlaceholderScreen.tsx
    ├── constants/
    │   ├── theme.ts                    # Colours, fonts, text presets
    │   └── assets.ts                   # Asset registry with intrinsic sizes
    ├── data/dashboard.ts               # Dashboard types + mock fetch
    ├── hooks/useDashboard.ts           # Dashboard state + refresh
    └── utils/
        ├── formatCurrency.ts           # Naira formatting
        └── pullPhysics.ts              # Rubber-band maths (worklets)
```

Routes live only in `src/app/`. Components, hooks and utilities stay outside it. Imports use the `@/` alias for `src/`, so `@/components/ui/Icon` points to `src/components/ui/Icon.tsx`.

## Pull to refresh

### What the user sees

1. **Pull**: dragging down from the top slides the content down. The indicator emerges from under the header and its ring winds clockwise as the pull grows. Resistance increases the further you pull.
2. **Arm**: at the trigger point (92 pt of visible pull, about 149 pt of finger travel) the ring finishes winding and a light haptic tap fires.
3. **Release**: the content springs to its hold position. The indicator rests 20 pt below the header with 21 pt between it and the balance card, and the whole indicator spins clockwise at one turn per second.
4. **Done**: once the data has loaded, everything springs back to rest.

Releasing before the trigger point springs the content back without refreshing.

### How it works

```text
GestureDetector (pan) ─── simultaneous with ───┐
└── View                                       │
    └── GestureDetector (native) ◄─────────────┘
        └── Animated.ScrollView
            ├── Animated.View  ← content, translateY = pullDistance
            └── RefreshIndicator ← sits above the content, scrolls with it
```

- A **pan gesture** runs alongside the scroll view's **native gesture**, so normal scrolling keeps its native physics.
- The pan only takes over when the list is at the top. Finger travel is converted to visible distance with a rubber-band curve (`src/utils/pullPhysics.ts`).
- While pulling, the scroll position is pinned to the top, so the content never scrolls and moves at the same time.
- All animation state is held in Reanimated shared values and animated with `transform` only. React does not re-render during a pull.
- `onRefresh` returns a promise. The component owns the refreshing state, so the indicator always retracts, even if the refresh fails or resolves instantly.

### Usage

```tsx
import { PullToRefreshScrollView } from '@/components/refresh/PullToRefreshScrollView';

<PullToRefreshScrollView
  onRefresh={refresh}               // () => Promise<unknown>
  contentInsetTop={10}              // space the content already leaves above its first item
  contentContainerStyle={styles.content}
>
  {/* screen content */}
</PullToRefreshScrollView>
```

### Timing

With the current mock data, a refresh spins for **2 seconds**, and the screen is back to rest about **2.4 seconds** after release. The spin lasts for whichever is longer: the data request, or a minimum of 1 second, so a fast response never makes the indicator flash.

### Tuning

| Constant | Value | File | Controls |
| --- | --- | --- | --- |
| `SIMULATED_LATENCY_MS` | `2000` | `src/data/dashboard.ts` | Mock request duration |
| `MIN_REFRESH_MS` | `1000` | `src/components/refresh/PullToRefreshScrollView.tsx` | Shortest possible spin |
| `PULL_LIMIT` | `240` | `src/components/refresh/PullToRefreshScrollView.tsx` | How stiff the rubber band feels |
| `INDICATOR_TOP` | `20` | `src/components/refresh/PullToRefreshScrollView.tsx` | Indicator's gap below the header while refreshing |
| `INDICATOR_GAP_BELOW` | `21` | `src/components/refresh/PullToRefreshScrollView.tsx` | Gap between the indicator and the content |
| `SPIN_DURATION` | `1000` | `src/components/refresh/RefreshIndicator.tsx` | Time for one full turn (ms) |
| `RING_ANGLE_AT_REST` / `RING_ANGLE_ARMED` | `54.47` / `121.6` | `src/components/refresh/RefreshIndicator.tsx` | Ring wind-up range (degrees) |

## Lottie animation

`animations/refresh-loading/` holds the refresh and loading indicator as a standalone [Lottie](https://airbnb.io/lottie/) animation, separate from the app UI.

| File | Description |
| --- | --- |
| `refresh-loading.json` | Indicator with named layers and `pull` / `loading` markers |
| `refresh-loading-plain.json` | Identical animation with every text label removed |

**Specs:** 61 × 61, 60 fps, 100 frames. The ring image is embedded in the file, so it has no external dependencies.

| Segment | Frames | Animation |
| --- | --- | --- |
| `pull` | 0–40 | The ring winds clockwise from 54.47° to 121.6°. Scrub it with pull progress. |
| `loading` | 40–100 | The whole indicator turns clockwise once per second. It loops seamlessly. |

### Previewing

- Drag the file into [lottiefiles.com/preview](https://lottiefiles.com/preview). This uploads the file to LottieFiles.
- Or open it with a Lottie preview extension in VS Code, which works offline.

### Using it in React Native

```bash
npx expo install lottie-react-native
```

```tsx
import LottieView from 'lottie-react-native';
import { useRef } from 'react';

const lottieRef = useRef<LottieView>(null);

<LottieView
  ref={lottieRef}
  source={require('../animations/refresh-loading/refresh-loading.json')}
  style={{ width: 61, height: 61 }}
/>;

// Wind-up while pulling
lottieRef.current?.play(0, 40);
// Loading spin (set the loop prop to keep it going)
lottieRef.current?.play(40, 100);
```

Adjust the `require` path relative to the file that uses it.

## Data layer

The dashboard currently uses **mock data**:

- `src/data/dashboard.ts` defines the `Dashboard` types, the initial data, and `fetchDashboard()`, which resolves the same data after a simulated delay.
- `src/hooks/useDashboard.ts` exposes `{ dashboard, refresh }`. `refresh()` fetches and then updates the state.

To connect the real API, replace the body of `fetchDashboard()` with the network request. The hook, screen and pull-to-refresh need no changes.

Errors are left to the data layer. The pull-to-refresh retracts whether `onRefresh` resolves or rejects.

## Design tokens and assets

- **Colours, fonts and text presets** live in `src/constants/theme.ts`. Use `colors.*` and the `type.*` presets instead of hard-coded values.
- **Fonts**: Sora (400, 600, 700, 800) and Montserrat Bold are loaded at startup. The splash screen stays up until they're ready. Each weight is imported individually, so unused font files are not bundled.
- **Assets** are registered in `src/constants/assets.ts` with their intrinsic width and height, so vectors always render undistorted through `<Icon />` or `expo-image`.
- **Naira sign**: Sora has no `₦` glyph, so the balance renders the symbol in the platform's bold system font.

## Accessibility

- Every action has an accessibility role and label (header actions, balance toggle, quick actions, tabs, carousel).
- The pull-to-refresh container reports `busy` while refreshing.
- **Reduced motion**: when the system setting is on, the spin is replaced with a gentle opacity pulse.
- The decorative indicator and watermark are hidden from screen readers.

## Known limitations

- **Ring image**: the indicator ring is a 2× raster, so it may look slightly soft on 3× screens. A 3× export would fix this.
- **No native bounce on iOS**: native scroll bounce is turned off on the home screen, because the pull replaces it at the top. This also removes the bounce at the bottom.
- **Placeholder tabs**: Wallet, Giftcards, Cards and Profile are placeholder screens.
- **Mock data**: see [Data layer](#data-layer).
- **Feel**: gestures and haptics can only be judged properly on a real device.

## Contributing

1. Create a branch from `main`.
2. Keep routes in `src/app/` and everything else outside it.
3. Add dependencies with `npx expo install`.
4. Before committing, run:

   ```bash
   npm run lint
   npm run typecheck
   ```

5. Write short, imperative commit messages, for example "Add balance card".

## License

[MIT](LICENSE) © 2026 Daniel Ubani
