import Icon from "./Icon";

const NAV_ITEMS = [
  { tab: "dashboard", icon: "wallet",   label: "Wallet"   },
  { tab: "history",   icon: "history",  label: "History"  },
  { tab: "settings",  icon: "settings", label: "Settings" },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "420px", background: "rgba(8,12,20,0.95)", borderTop: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", display: "flex", justifyContent: "space-around", padding: "12px 0 20px" }}>
      {NAV_ITEMS.map(({ tab, icon, label }) => (
        <button key={tab} onClick={() => onTabChange(tab)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", color: activeTab === tab ? "#7c83fd" : "#444", transition: "color 0.2s", padding: "0 20px" }}>
          <div style={{ transform: activeTab === tab ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s" }}>
            <Icon name={icon} size={20} />
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.06em" }}>{label}</span>
        </button>
      ))}
    </div>
  );
}
