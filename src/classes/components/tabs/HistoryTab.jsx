import Icon from "../Icon";
import { TRANSACTIONS } from "../../data/transactions";

export default function HistoryTab() {
  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ fontSize: "11px", color: "#444", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
        Recent Transactions
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {TRANSACTIONS.map((tx, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", animation: `fadeUp 0.4s ease ${0.06 * i}s both` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "10px", background: tx.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: tx.color }}>
                <Icon name={tx.type} size={16} />
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>{tx.label}</div>
                <div style={{ fontSize: "11px", color: "#555" }}>{tx.time}</div>
              </div>
            </div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "13px", fontWeight: "700", color: tx.color }}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
