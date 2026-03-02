export default function StatCard({ label, value, sub, color, loading }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "16px", position: "relative", overflow: "hidden" }}>
      {/* Glow orb */}
      <div style={{ position: "absolute", top: -20, right: -20, width: 70, height: 70, borderRadius: "50%", background: color + "15", filter: "blur(20px)" }} />

      <div style={{ fontSize: "11px", color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
        {label}
      </div>

      {loading ? (
        <div style={{ height: "28px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", animation: "pulse 1.5s ease infinite" }} />
      ) : (
        <>
          <div style={{ fontSize: "22px", fontWeight: "800", color, fontFamily: "'Space Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
          {sub && <div style={{ fontSize: "11px", color: "#555", marginTop: "4px" }}>{sub}</div>}
        </>
      )}
    </div>
  );
}
