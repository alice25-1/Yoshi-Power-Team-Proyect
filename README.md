# 🚀 Space Frogg: Mission to the Moon (Yoshi Power Team)

An interactive educational space adventure inspired by NASA's **Artemis lunar exploration missions**. Players join Commander **Baudinii** and **Tongue** aboard the *Goliat* spacecraft, solving aerospace engineering challenges, managing critical power/mass trade-offs, and collecting lunar samples to transmit scientific discoveries back to Earth.

---

## 📌 Project Architecture & Current Status

This project consists of **two main modules** developed by our team:

1. **Web Interface, Narrative & Engineering HUD (React + Vite):**
   - Contains the **Start Screen, Chapter Select, Educational Dialogues, Engineering Trade-Off Decisions, HUD Telemetry, and Mission Endings**.
   - When run on `localhost`, it operates as an **interactive prototype/tester** for all screens, dialogues, and decision branches across Chapters 1, 2, and 3.
2. **Core Gameplay & Minigames (Unity Engine — `.zip` Package):**
   - All playable levels, character movement, docking alignment, umbilical cables, meteor evasion, lunar survey skill-checks, and sample collection mechanics were built in **Unity** (included in the `.zip` file in this repository).
   - *Note:* Full real-time linking between the React web shell and the Unity build was left pending at submission time, so both parts can be evaluated independently using the steps below.

---

## 🖥️ 1. How to Run the Web UI, Screens & Dialogues (`localhost`)

To preview the React interface, story dialogues, trade-offs, and mission screens:

1. **Make sure you have [Node.js](https://nodejs.org) installed** (v18 or higher).
2. **Clone or download this repository** and open a terminal inside the project root folder:
   ```bash
   git clone <YOUR-GITHUB-REPO-URL>
   cd <YOUR-REPO-FOLDER>
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the local development server (`localhost`):**
   ```bash
   npm run dev
   ```
5. **Open in your browser:**
   - Go to **`http://localhost:5173`**
   - Click **PLAY** and use the **Dialogue & Trade-Off Tester** panel to explore every chapter's narrative, engineering choices, and endings.

---

## 🎮 2. How to Run the Unity Game (`.zip` Package)

To play the interactive levels and minigames built in Unity:

1. Download the attached **Unity game `.zip` package** from this repository and extract it to a folder on your PC.
2. Open the extracted folder and launch the Unity executable (or open the project folder directly in **Unity Hub / Unity Editor**).

### Unity Controls & Gameplay Guide
- **Move Character / Spaceship:** `W A S D` or `Arrow Keys`
- **Interact with Consoles / Doors:** `E`
- **Docking Alignment (Chapter 1):** Move the mouse to keep the pointer inside the target ring
- **Umbilical Cables & Circuit Puzzles:** Left-click and drag / click to rotate connectors
- **Lunar Survey Skill Check (Chapter 3):** Press `SPACE` when the indicator hits the target zone
- **Sample Collection (Chapter 3):** Click repeatedly on lunar rocks to brush off dust and collect samples

---

## 🛠️ Tech Stack
- **Web Interface, Narrative & Trade-Offs:** React + Vite + Tailwind CSS
- **Gameplay & Minigames:** Unity Engine (C#)

---

## 👥 Team — Yoshi Power
Developed in Guatemala for the Space Exploration Hackathon.
