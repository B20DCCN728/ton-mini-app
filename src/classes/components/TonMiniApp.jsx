import { useState, useEffect } from "react";

import { useTelegramSDK } from "../../hooks/useTelegramSDK";
import { useTONWallet }   from "../../hooks/useTONWallet";
import { delay }          from "../utils/helpers";

import Icon          from "./Icon";
import BottomNav     from "./BottomNav";
import DashboardTab  from "./tabs/DashboardTab";
import HistoryTab    from "./tabs/HistoryTab";
import SettingsTab   from "./tabs/SettingsTab";

export default function TonMiniApp() {
  const { user }                                    = useTelegramSDK();
  const { wallet, connecting, connect, disconnect } = useTONWallet();
  const [refreshing, setRefreshing]                 = useState(false);
  const [tonPrice,   setTonPrice]                   = useState(null);
  const [activeTab,  setActiveTab]                  = useState("dashboard");

  useEffect(() => {
    // TODO: fetch real price → https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd
    const t = setTimeout(() => setTonPrice("1.99"), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await delay(1800);
    setRefreshing(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", fontFamily: "'Sora', sans-serif", color: "#f0f0f0", maxWidth: "420px", margin: "0 auto", display: "flex", flexDirection: "column" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ padding: "20px 20px 0", animation: "fadeUp 0.5s ease both" }}>
        {/* Top bar: avatar + refresh */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: 38, height: 38, borderRadius: "12px", background: "linear-gradient(135deg, #7c83fd, #00e5ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", animation: "float 3s ease-in-out infinite" }}>💎</div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "15px", letterSpacing: "-0.01em" }}>
                {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
              </div>
              <div style={{ fontSize: "11px", color: "#555", fontFamily: "'Space Mono', monospace" }}>
                {user ? `@${user.username}` : "···"}
              </div>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#666", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#aaa"}
            onMouseLeave={e => e.currentTarget.style.color = "#666"}
          >
            <div style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }}>
              <Icon name="refresh" size={16} />
            </div>
          </button>
        </div>

        {/* TON price ticker */}
        <div style={{ background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "10px", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5ff", boxShadow: "0 0 8px #00e5ff" }} />
            <span style={{ fontSize: "12px", color: "#555", fontFamily: "'Space Mono', monospace" }}>TON / USD</span>
          </div>
          {tonPrice
            ? <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: "700", color: "#00e5ff" }}>${tonPrice} <span style={{ color: "#00e676", fontSize: "11px" }}>▲ 2.4%</span></span>
            : <div style={{ width: 70, height: 14, background: "rgba(255,255,255,0.06)", borderRadius: "4px", animation: "pulse 1.5s ease infinite" }} />
          }
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────────── */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: "4px" }}>
        {["dashboard", "history", "settings"].map(t => (
          <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Tab content ────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 100px" }}>
        {activeTab === "dashboard" && <DashboardTab wallet={wallet} connecting={connecting} onConnect={connect} onDisconnect={disconnect} tonPrice={tonPrice} />}
        {activeTab === "history"   && <HistoryTab />}
        {activeTab === "settings"  && <SettingsTab />}
      </div>

      {/* ── Bottom nav ─────────────────────────────────────────────────────── */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
