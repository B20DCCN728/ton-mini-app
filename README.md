# 💎 TON Mini App — Telegram Web3 Dashboard

A Telegram Mini App built with **React + Vite** integrated with **TON Blockchain**. Features a full wallet dashboard with connect/disconnect, token stats, quick actions with loading states, transaction history, and settings — all running natively inside Telegram.

---

## ✨ Features

- 🔗 **TON Wallet Connect** — connect/disconnect with loading states
- 💰 **Balance Dashboard** — real-time TON balance & USD value
- ⚡ **Quick Actions** — Send, Receive, Stake, Swap, NFT Gallery, DeFi Pools
- 🔄 **Loading States** — every button has `idle → loading → success/error` feedback
- 📋 **Transaction History** — recent on-chain activity
- ⚙️ **Settings Tab** — notifications, security, network config
- 📱 **Mobile-first UI** — optimized for Telegram WebView (420px)
- 🌐 **Telegram SDK** — reads user info directly from Telegram

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Blockchain | TON Connect (`@tonconnect/ui-react`) |
| Telegram | `@twa-dev/sdk` |
| Styling | CSS-in-JS + CSS Modules |
| Fonts | Space Mono + Sora (Google Fonts) |
| Deploy | Vercel |

---

## 📁 Project Structure

```
src/
├── main.jsx                        # Entry point + TonConnectUIProvider
├── App.jsx                         # Root, imports global CSS
├── styles/
│   └── global.css                  # Keyframe animations, shared classes
├── utils/
│   └── helpers.js                  # Shared delay() utility
├── data/
│   └── transactions.js             # Mock transaction data
├── hooks/
│   ├── useTelegramSDK.js           # Telegram user info hook
│   └── useTONWallet.js             # TON wallet connect/disconnect hook
└── components/
    ├── Icon.jsx                    # All SVG icons
    ├── Spinner.jsx                 # Loading spinner
    ├── ActionButton.jsx            # Button with 3 states (loading/success/error)
    ├── StatCard.jsx                # Numeric stat display card
    ├── WalletCard.jsx              # Wallet balance + connect UI
    ├── BottomNav.jsx               # Fixed bottom navigation bar
    ├── TonMiniApp.jsx              # Root layout component
    └── tabs/
        ├── DashboardTab.jsx        # Wallet + stats + action grid
        ├── HistoryTab.jsx          # Transaction list
        └── SettingsTab.jsx         # Settings actions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Install

```bash
git clone https://github.com/YOUR_USERNAME/ton-mini-app.git
cd ton-mini-app
npm install
```

### Run locally

```bash
npm run dev
# → http://localhost:5173
```

> ⚠️ Telegram-specific features (user info, WebApp SDK) require HTTPS + Telegram context. Use **ngrok** to test on real device:

```bash
# Terminal 1
npm run dev

# Terminal 2
npx ngrok http 5173
# → https://xxxx.ngrok-free.app  ← paste this into BotFather
```

### Build

```bash
npm run build
# → output in dist/
```

---

## ☁️ Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
# → https://ton-mini-app-xyz.vercel.app
```

Every push to `main` on GitHub will auto-redeploy if you connect your repo to Vercel.

---

## ⚙️ Configuration

### 1. `public/tonconnect-manifest.json`

Required for TON Connect wallet. Update the URL after deploy:

```json
{
  "url": "https://your-app.vercel.app",
  "name": "TON Mini App",
  "iconUrl": "https://your-app.vercel.app/icon.png"
}
```

### 2. Enable real Telegram SDK

In `src/hooks/useTelegramSDK.js`, replace the DEV simulation with:

```js
import WebApp from "@twa-dev/sdk";

useEffect(() => {
  WebApp.ready();
  WebApp.expand();
  const tgUser = WebApp.initDataUnsafe?.user;
  if (tgUser) setUser(tgUser);
}, []);
```

### 3. Enable TON Connect in `src/main.jsx`

```jsx
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// Uncomment the provider wrapper:
<TonConnectUIProvider manifestUrl="https://your-app.vercel.app/tonconnect-manifest.json">
  <App />
</TonConnectUIProvider>
```

### 4. `vite.config.js` — required for TON SDK

```js
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',  // fixes TON SDK "global is not defined"
  },
})
```

---

## 🤖 BotFather Setup

1. Open Telegram → search **@BotFather**
2. `/newbot` → enter name & username → copy **API Token**
3. `/newapp` → select your bot → paste your **Vercel URL**
4. `/setmenubutton` → set button label (e.g. `Open App`) + URL

---

## 📱 How to Open the Mini App

1. Open Telegram on mobile
2. Search your bot (e.g. `@ton_mini_app_bot`)
3. Tap **START**
4. Tap the **Open App** button at the bottom of the chat
5. The dashboard opens inside Telegram ✅

---

## 🔌 Switching from Mock to Production

All mock/simulated code is clearly marked with comments:

```js
// DEV simulation ← remove this block
setTimeout(() => { ... }, 800);

// ✅ PRODUCTION ← uncomment this block
// const tgUser = WebApp.initDataUnsafe?.user;
```

Files to update for production:
- `src/hooks/useTelegramSDK.js` — real Telegram user
- `src/hooks/useTONWallet.js` — real TON Connect
- `src/main.jsx` — enable `TonConnectUIProvider`
- `public/tonconnect-manifest.json` — real domain URL

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "@tonconnect/ui-react": "latest",
    "@twa-dev/sdk": "latest"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "^4"
  }
}
```

---

## 📄 License

MIT © 2025