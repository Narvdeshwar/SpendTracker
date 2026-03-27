# 💸 SpendTracker (PennyTrack) 
### *Precision Personal Finance. Reimagined.*

SpendTracker is an ultra-modern, high-performance personal finance dashboard designed with **Apple-inspired Glassmorphism** and advanced data visualization. Track your net worth, manage categorical budgets, and extract deep financial insights with a seamless, premium interface.

![PennyTrack Preview](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## 💎 Premium Features

- **Apple Glassmorphism UI**: High-blur surfaces, saturated backdrops, and ultra-thin borders for a state-of-the-art visual experience with zero-latency 60fps animations.
- **Smart Cash & Online Mode**: A dedicated **Pay Mode Selector** that toggles between Cash Wallets and Online Bank Accounts, ensuring your physical and digital wealth are tracked with equal precision.
- **Behavioral Analytics Engine**: Real-time spending intelligence that calculates **Burn Rates**, **Daily Averages**, and **Category Concentration** to proactively alert you of unusual behavior.
- **Persistent Account Memory**: Intelligent UI that remembers your last used payment source, reducing the number of taps required to log your daily expenses.
- **Universal Dark Mode**: Comprehensive theme stability with optimized contrast for crystal-clear financial monitoring in all lighting conditions.
- **Global Quick-Add**: A persistent, floating drawer that lets you log transactions in under 2 seconds.
- **Advanced Export & Sync**: Multi-format data extraction (CSV/JSON) with live table previews and real-time **Supabase** backend synchronization.

## 🚀 Tech Stack

- **React 19 & Vite**: Lightning-fast frontend architecture with optimal cold-start performance.
- **Supabase**: Real-time database and secure authentication layer for seamless persistent storage.
- **TypeScript**: Type-safe financial logic for maximum reliability during high-frequency tracking.
- **Framer Motion**: Smooth, cinematic UI transitions and micro-interactions optimized for mobile GPUs.
- **Lucide Icons**: Crisp, professional iconography including specialized assets for Cash and Banking.
- **Recharts**: High-fidelity SVG data visualization for clear categorical distribution.
- **Capacitor**: Enterprise-grade deployment for native Android/iOS mobile application experience.

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS)
- NPM or PNPM
- [Supabase Account](https://supabase.com/) (For persistent data)

### Installation

1. **Clone & Enter**
   ```bash
   git clone git@github-personal:Narvdeshwar/SpendTracker.git
   cd SpendTracker
   ```

2. **Setup Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Launch Dev Server**
   ```bash
   npm run dev
   ```

## 🏗️ Deployment

To build for production:
```bash
npm run build
```

To sync with mobile (Capacitor):
```bash
npx cap sync
npx cap open android
```

---
*Created with ❤️ for high-net-worth engineering.*
