# CONTEXT_MAP: "THE BRIDGE" MOBILE APP
**Last Updated:** Phase 2 Completion (Transitioning Agents)
**Project Objective:** A local-first, privacy-preserving React Native (Expo) application designed to intercept algorithmic scrolling habits and deploy physical grounding techniques.

---

## 1. THE LAWS (System Directives)
* **Operating Principle:** Absolute local-first data sovereignty. Zero-cost core infrastructure.
* **Aesthetic:** "The Terminal" / Neon-Noir. Brutalist, high-contrast, no gradients, minimal border-radius.
* **Tech Stack:** * Framework: React Native + Expo (SDK 50+)
    * Routing: Expo Router
    * State: Zustand (NO Redux/Context API)
    * Styling: NativeWind (Tailwind CSS)
    * Database: `expo-sqlite` (Local-only)
    * Auth: Appwrite SDK
    * Animations: `moti` + `react-native-reanimated`

---

## 2. DESIGN SYSTEM TOKENS (tailwind.config.js)
* **Background:** Deep Obsidian (`#0A0A0A`)
* **Typography:** JetBrains Mono (Primary & Monospace)
* **Emotion Mappings (Accents):**
    * Boredom: Intercept Cyan (`#00EEFF`)
    * Anxiety: Pulse Violet (`#8A2BE2`)
    * Uncertainty: Safety Orange (`#FF8C00`)
    * Fatigue: Muted Moss (`#8FBC8F`)

---

## 3. CURRENT ARCHITECTURE & FILE TREE
The following structure and files have been successfully scaffolded:

```text
/
├── .agent/
│   └── rules                 # Hard constraints for AI generation
├── app/                      # Expo Router Screens
│   ├── index.tsx             # Entry point
│   ├── Interceptor.tsx       # 4-button emotion selection
│   ├── Timer.tsx             # 60s locked countdown (gestures disabled)
│   ├── Decision.tsx          # Post-anchor choice screen
│   └── Dashboard.tsx         # Astro-Graph visualization
├── src/
│   ├── core/
│   │   ├── database/
│   │   │   └── schema.ts     # DDL for expo-sqlite
│   │   └── store/
│   │       └── useStore.ts   # Zustand state management
│   ├── features/
│   │   ├── intercept/
│   │   ├── analytics/
│   │   └── library/
│   └── ui/
│       └── components/
│           ├── GlassCard.tsx    # expo-blur integration
│           ├── NeonButton.tsx   # moti glow animations
│           └── TerminalText.tsx # Standardized typography
├── tailwind.config.js        # Registered custom tokens
└── CONTEXT_MAP.md            # You are reading this

4. DATABASE SCHEMA (expo-sqlite)
The local database handles three primary tables. Do not alter these without explicit instruction.

InterceptedApps: id (PK), bundleId (Unique), appName, isActive

BridgeLogs: id (PK), timestamp, emotionState, interceptOutcome, targetApp

AnchorTasks: id (PK), category, taskDirective, durationSeconds

5. CURRENT STATE & HANDOVER NOTES
Status: Phases 1 (Skeleton) and 2 (UI/UX) are complete. The visual scaffolding, routing, and design system are locked in.
Pending Technical Debt / Next Steps:

The UI screens currently lack the underlying Zustand logic to pass the selected emotion from Interceptor.tsx to Timer.tsx.

The native interception modules (the core mechanism to detect foreground apps) have NOT been built yet.

The database schema.ts is written but needs initialization logic injected into the root _layout.tsx to ensure tables are created on first launch.

AI INSTRUCTION: Read this document entirely. When asked to generate code, align strictly with the "Tech Stack" and "Design System" defined above. Do not suggest third-party UI libraries.