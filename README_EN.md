# 🐾 NavBarPets - Windows Desktop Companions

<div align="center">

<img src="src/assets/icons/icon.png" alt="NavBarPets Logo" width="120" height="120">

### Adorable and Intelligent Desktop Companions Living on Your Windows Taskbar

[🇹🇷 **Türkçe**](README.md) • [🇺🇸 **English**](README_EN.md)

<br/>

[![Download for Windows](https://img.shields.io/badge/⬇️_Download_for_Windows-6366F1?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/phaticusthiccy/NavBarPets/releases/latest)

<br/>

[![Electron](https://img.shields.io/badge/Electron-30.0.0-47848F?style=flat-square&logo=electron&logoColor=white)](https://electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%20%7C%2011-0078D6?style=flat-square&logo=windows&logoColor=white)](https://microsoft.com/windows)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## 📥 Download & Install

To run NavBarPets on your PC, grab the latest binary release from the links below:

| Package Type | Download Link | Description |
| :--- | :--- | :--- |
| **🚀 Windows Installer (.exe)** | [**Download NavBarPets Setup**](https://github.com/phaticusthiccy/NavBarPets/releases/latest) | Standard Windows NSIS installation wizard with automatic desktop shortcuts and uninstaller. |
| **📦 Portable Edition (.exe)** | [**Download NavBarPets Portable**](https://github.com/phaticusthiccy/NavBarPets/releases/latest) | Zero installation required; run directly from a USB drive or any folder. |

> [!TIP]
> Browse changelogs, assets, and previous versions on the [GitHub Releases](https://github.com/phaticusthiccy/NavBarPets/releases) page.

---

## 📖 Overview

**NavBarPets** is a modern desktop companion application that roams freely on top of your Windows Taskbar, puts on headphones and grooves along with songs playing on your PC, observes a real-time circadian sleep schedule, and features over 75 procedural kinematic animations.

Powered by a transparent overlay engine and hardware-accelerated HTML5 Canvas rendering, it operates quietly in the background with minimal system overhead (low CPU & RAM consumption).

---

## ✨ Key Features

### 🐾 1. 11 Unique Pets & Legendary Characters
11 distinct companions, each with procedural animations, signature particle physics, and audio-reactive dance behaviors:

- **🐱 Neko Cat (`neko`):** Ear twitches, paw grooming, loaf pose, butterfly chasing, and disco grooves.
- **🐕 Shiba Inu (`shiba`):** Curly tail wags, sniffing ground, bleps, zoomies dashes, and happy hops.
- **🟢 Cyber Slime (`slime`):** Holographic core, jelly elasticity, electrical discharges, and soft-body squish.
- **🐉 Mini Dragon (`dragon`):** Smoke rings puffing, wing glides, curling around its tail.
- **🦆 Pixel Duck (`duck`):** Waddling steps, water dipping head bobs, fluffing feathers, 360 spin dances.
- **🦊 Kitsune Fox (`fox`):** Bushy mystical flame-tipped tail, ember spark particles, agile leaps.
- **🐰 Mochi Bunny (`bunny`):** Long floppy ear bounces, twitching nose, carrot craving, joyful hopping.
- **🐧 Chilly Penguin (`penguin`):** Red knitted winter scarf, wing flaps, and cute pattering steps.
- **💨 Valorant Jett (`jett`):** Wind currents, floating cyan neon Kunai daggers, and supersonic dashes.
- **🍄 Super Mario (`mario`):** Iconic red 'M' cap, blue overalls, mustache wiggles, and bouncy super jumps.
- **⚡ Pikachu (`pikachu`):** Zigzag lightning bolt tail, red electric cheek pouches, and dynamic ear twitches.

---

### 🎬 2. 75+ Rich Procedural Kinematic Animations & State Machine
Pets transition fluidly through 6 core behavior pools with state blending:
- **Idle:** Ear grooming, air sniffing, full-body fur shake, standing doze, yawning, loafing.
- **Walk:** Proud parade strut, cautious stalk/prowl, swagger waddle, tiptoe gait.
- **Run:** Bounding gallop, corner drift slide, agile zigzagging, turbo aerodynamic sprint.
- **Dance:** Robot pop-and-lock, wave shuffle, hype jumping, tap/step groove, moonwalk.
- **Play:** Somersault roll, peek-a-boo hiding, butterfly catching, butt-wiggle pounce.
- **Sleep:** Belly-up sprawl, snore bubbles, dream-world running, tail cuddle pillow.

---

### 🎵 3. Spotify & YouTube Live Music Detection
- Detects background media playback automatically from Spotify, YouTube, and media players.
- Pet immediately **puts on headphones**, starts dancing to the rhythm, and spawns musical notes.
- Dashboard features real-time track info, artist name, and a live audio visualizer equalizer.

---

### ⏰ 4. Circadian Sleep Scheduler (Bio Clock)
- During scheduled hours (e.g. `23:00 - 08:00`), companions automatically wear their **nightcaps** and enter deep sleep with drifting Zzz particles.
- Manual quick sleep and wake controls are accessible from the dashboard and system tray context menu.

---

### 📏 5. Taskbar Ground Baseline & Scale Settings
- **Pet Scale Multiplier:** Customize size from 0.6x up to 2.0x.
- **Ground Placement Mode:** Perch along the taskbar bottom base or sit on top of the taskbar shelf.
- **Vertical Offset Tuning:** Pixel-perfect vertical positioning adjustments for custom Windows themes and high DPI displays.

---

### 🎨 6. 8 Modern Glassmorphism Themes & Full i18n Localization
- **8 Tailored Themes:** *Midnight Glass, Cyber Neon, Cozy Pastel, Deep OLED, Sunset Aurora, Emerald Forest, Vampire Velvet, Nordic Frost*.
- **🇹🇷 Turkish & 🇺🇸 English:** Instant real-time UI, system tray, and pet catalog translation with zero restarts.

---

### 🚀 7. Windows System Tray & Integration
- Seamlessly minimizes to the **System Tray** when closed.
- Quick tray actions for one-click pet swapping, sleep toggles, and test dance triggers.
- Automatic launch on Windows startup configuration.

---

## 🛠️ Building & Development from Source

### Prerequisites:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Windows 10 / 11**

### 1. Clone Repository and Install Dependencies:
```bash
git clone https://github.com/phaticusthiccy/NavBarPets.git
cd NavBarPets
npm install
```

### 2. Run in Development Mode:
```bash
npm start
```

### 3. Build Windows Installer (`.exe`):
```bash
npm run dist
```
Compiled setup (`NavBarPets Setup 1.0.0.exe`) and portable (`NavBarPets 1.0.0.exe`) binaries are generated in the `dist/` directory.

---

## 📂 Project Architecture

```
NavBarPets/
├── src/
│   ├── assets/
│   │   └── icons/               # Application and System Tray branding (icon.png)
│   ├── main/
│   │   ├── index.js             # Electron Main Process & Window Orchestrator
│   │   ├── tray.js              # System Tray Management & Dynamic Context Menu
│   │   ├── mediaDetector.js     # Windows Media Playback Telemetry Engine
│   │   ├── taskbarDetector.js   # Taskbar Metrics & Coordinate Locator
│   │   └── startupManager.js    # Windows Startup Registry Integration
│   ├── overlay/
│   │   ├── overlay.html         # Transparent Desktop Canvas Viewport
│   │   ├── petEngine.js         # Physics, Finite State Machine, and AI Director
│   │   ├── petRenderer.js       # HTML5 Canvas 2D Character Render System
│   │   ├── animationBehaviors.js# 75+ Procedural Kinematics & Behavior Pools
│   │   └── particleSystem.js    # Heart, Note, Zzz, Ember & Snow Particle System
│   ├── preload/
│   │   ├── dashboardPreload.js  # Dashboard IPC Secure Context Bridge
│   │   └── overlayPreload.js    # Overlay IPC Secure Context Bridge
│   └── renderer/
│       ├── index.html           # Modern Glassmorphism Dashboard UI
│       ├── index.css            # Design System & 8 Curated UI Themes
│       ├── dashboard.js         # Dashboard Controller & Real-Time Canvas Previews
│       └── i18n.js              # Turkish & English Localization Engine
├── electron-builder.json        # Electron Builder Distribution Configuration
├── package.json
└── README.md
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
