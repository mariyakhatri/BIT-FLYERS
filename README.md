# VAYU VEER 🚁
### AI-Powered Disaster Response and Survivor Detection Dashboard

**Team:** BIT FLYERS

VAYU VEER is a disaster-response UAV dashboard concept designed to support search-and-rescue operations through aerial situational awareness, survivor-detection visualization, hazard monitoring, and mission telemetry.

This project provides a React-based dashboard prototype with simulated mission data and visual detection examples.

## ✨ Features

- **Mission Overview** — mission statistics, recent detections, and operational status.
- **Rescue Map** — a geospatial-style view for visualizing mission locations and target markers.
- **AI Detection & Rescue Intelligence** — sample detection cards, confidence indicators, search, and filters.
- **UAV Flight Stream** — simulated aerial feed and flight telemetry panels.
- **Mission History & Settings** — navigation sections for future expansion.
- **Interactive Dashboard** — navigation, status indicators, and demo controls.
- **Disaster Imagery** — sample aerial, flood, thermal, and rescue-related images.

## 🛠️ Technology Stack

- React
- Vite
- JavaScript (JSX)
- CSS
- Lucide React icons
- Git and GitHub

## 📁 Project Structure

```text
vayu-veer-dashboard/
├── public/
│   └── images/
│       ├── survivor04.jpg
│       ├── powerline.jpg
│       ├── det-4.jpg
│       ├── det-5.jpg
│       ├── det-3.jpg
│       ├── det-7.jpg
│       └── feed.jpg
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) (LTS recommended).

### Installation

Clone the repository:

```bash
git clone https://github.com/mariyakh atri/BIT-FLYERS.git
```

Enter the project directory:

```bash
cd BIT-FLYERS
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173/`.

### Production Build

```bash
npm run build
```

The production build is generated in the `dist/` directory.

## 🖼️ Image Assets

Place the dashboard's sample images in `public/images/` using the filenames listed in the project structure.

These images are illustrative assets for the prototype and do not represent verified live detections.

## ⚠️ Current Scope and Limitations

- This is a frontend prototype using simulated data.
- The map is a visualization and is not a live GPS feed.
- The video and telemetry panels are not connected to real UAV hardware.
- Detection examples do not confirm the presence of real survivors.
- Backend services, real-time drone integration, and production deployment are future development possibilities.

## 🔮 Future Improvements

- Integrate a Python-based object-detection service.
- Connect real-time UAV telemetry and GPS data.
- Add live map data and geospatial mission tracking.
- Connect a backend for mission and detection records.
- Improve accessibility, responsiveness, and automated testing.

## 👥 Team

**BIT FLYERS**

Project: **VAYU VEER — Disaster Response UAV Dashboard**

---

*Built as a disaster-response technology prototype to support search-and-rescue situational awareness.*
