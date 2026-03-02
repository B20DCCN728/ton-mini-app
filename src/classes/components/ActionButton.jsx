import { useState } from "react";
import Icon from "./Icon";
import Spinner from "./Spinner";

export default function ActionButton({ icon, label, description, color, action, disabled }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState(false);

  const handleClick = async () => {
    if (loading || disabled) return;
    setLoading(true); setSuccess(false); setError(false);
    try {
      await action();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  const state = loading ? "loading" : success ? "success" : error ? "error" : "idle";

  const bg = state === "success" ? "rgba(0,230,118,0.12)"
           : state === "error"   ? "rgba(255,71,87,0.12)"
           : "rgba(255,255,255,0.04)";

  const borderColor = state === "success" ? "rgba(0,230,118,0.4)"
                    : state === "error"   ? "rgba(255,71,87,0.4)"
                    : state === "loading" ? color + "99"
                    : color + "44";

  const iconBg    = state === "success" ? "rgba(0,230,118,0.2)" : state === "error" ? "rgba(255,71,87,0.2)" : color + "22";
  const iconColor = state === "success" ? "#00e676" : state === "error" ? "#ff4757" : color;
  const textColor = state === "success" ? "#00e676" : state === "error" ? "#ff4757" : "#f0f0f0";
  const labelText = loading ? "Processing..." : state === "success" ? "Success!" : state === "error" ? "Failed" : label;

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className="action-btn"
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        borderRadius: "16px", padding: "18px 16px",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: loading ? "scale(0.97)" : "scale(1)",
        opacity: disabled ? 0.5 : 1,
        position: "relative", overflow: "hidden", width: "100%",
      }}
    >
      {/* Glow overlay when loading */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 0%, ${color}18 0%, transparent 70%)`,
        opacity: state === "loading" ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
        {/* Icon box */}
        <div style={{ width: 38, height: 38, borderRadius: "10px", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: iconColor, flexShrink: 0, transition: "all 0.2s" }}>
          {loading          ? <Spinner size={18} />
           : state === "success" ? <Icon name="check" size={18} />
           : state === "error"   ? <Icon name="alert" size={18} />
           : <Icon name={icon} size={18} />}
        </div>

        {/* Text */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: "700", color: textColor, letterSpacing: "0.04em" }}>
            {labelText}
          </div>
          <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>{description}</div>
        </div>
      </div>

      {/* Progress bar at bottom */}
      {loading && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: color + "33" }}>
          <div style={{ height: "100%", background: color, animation: "loadbar 1.5s ease-in-out infinite", transformOrigin: "left" }} />
        </div>
      )}
    </button>
  );
}
