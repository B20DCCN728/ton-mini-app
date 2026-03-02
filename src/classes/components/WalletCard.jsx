import { useState } from "react";
import Icon from "./Icon";
import Spinner from "./Spinner";

export default function WalletCard({ wallet, connecting, onConnect, onDisconnect }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // PROD: navigator.clipboard.writeText(wallet.fullAddress)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(124,131,253,0.15) 0%, rgba(0,229,255,0.08) 100%)", border: "1px solid rgba(124,131,253,0.25)", borderRadius: "20px", padding: "22px", marginBottom: "16px", position: "relative", overflow: "hidden" }}>
      {/* BG glows */}
      <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, borderRadius: "50%", background: "rgba(124,131,253,0.12)", filter: "blur(30px)" }} />
      <div style={{ position: "absolute", bottom: -30, left: -30, width: 100, height: 100, borderRadius: "50%", background: "rgba(0,229,255,0.08)", filter: "blur(25px)" }} />

      <div style={{ position: "relative" }}>
        <div style={{ fontSize: "11px", color: "#666", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", marginBottom: "6px" }}>WALLET BALANCE</div>

        {wallet ? (
          <>
            {/* Balance */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.03em", color: "#fff" }}>{wallet.balance}</span>
              <span style={{ fontSize: "16px", color: "#7c83fd", fontWeight: "600" }}>TON</span>
            </div>
            <div style={{ fontSize: "14px", color: "#555", marginBottom: "16px" }}>≈ ${wallet.usdValue} USD</div>

            {/* Address row */}
            <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: "10px", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#666" }}>{wallet.address}</span>
              <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#00e676" : "#555", transition: "color 0.2s" }}>
                <Icon name={copied ? "check" : "copy"} size={15} />
              </button>
            </div>

            {/* Disconnect */}
            <button onClick={onDisconnect} disabled={connecting} style={{ marginTop: "12px", width: "100%", padding: "10px", background: "rgba(255,71,87,0.1)", border: "1px solid rgba(255,71,87,0.25)", borderRadius: "10px", color: "#ff4757", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s" }}>
              {connecting && <Spinner size={14} />}
              {connecting ? "Disconnecting..." : "Disconnect Wallet"}
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: "32px", fontWeight: "800", color: "#333", marginBottom: "4px" }}>——</div>
            <div style={{ fontSize: "13px", color: "#444", marginBottom: "16px" }}>Connect to view balance</div>

            {/* Connect */}
            <button onClick={onConnect} disabled={connecting} style={{ width: "100%", padding: "14px", background: connecting ? "rgba(124,131,253,0.15)" : "linear-gradient(135deg, #7c83fd, #00e5ff)", border: "none", borderRadius: "12px", color: connecting ? "#7c83fd" : "#fff", cursor: connecting ? "not-allowed" : "pointer", fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.3s", letterSpacing: "0.04em", boxShadow: connecting ? "none" : "0 8px 24px rgba(124,131,253,0.35)" }}>
              {connecting ? <Spinner size={16} /> : <Icon name="wallet" size={16} />}
              {connecting ? "Connecting to TON..." : "Connect TON Wallet"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
