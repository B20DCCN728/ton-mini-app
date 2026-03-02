import WalletCard  from "../WalletCard";
import StatCard    from "../StatCard";
import ActionButton from "../ActionButton";
import { delay }   from "../../utils/helpers";

export default function DashboardTab({ wallet, connecting, onConnect, onDisconnect, tonPrice }) {
  const actions = [
    { icon: "send",    label: "Send TON",    description: "Transfer to any address", color: "#7c83fd", disabled: false,   action: async () => delay(2200) },
    { icon: "receive", label: "Receive",     description: "Get your QR code",        color: "#00e5ff", disabled: false,   action: async () => delay(1400) },
    { icon: "stake",   label: "Stake TON",   description: "Earn ~4.5% APY",          color: "#ffd32a", disabled: !wallet, action: async () => delay(3000) },
    { icon: "swap",    label: "Swap Tokens", description: "TON ↔ USDT / USDC",       color: "#ff6b9d", disabled: !wallet, action: async () => delay(2500) },
    { icon: "nft",     label: "NFT Gallery", description: "View your collectibles",  color: "#00e676", disabled: !wallet, action: async () => delay(1800) },
    { icon: "gem",     label: "DeFi Pools",  description: "Provide liquidity",       color: "#ff9f43", disabled: !wallet, action: async () => { await delay(2800); if (!wallet) throw new Error("No wallet"); } },
  ];

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <WalletCard wallet={wallet} connecting={connecting} onConnect={onConnect} onDisconnect={onDisconnect} />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        <StatCard label="Staked"  value={wallet ? "50 TON"   : "—"} sub="~$99.50 USD" color="#ffd32a" loading={!tonPrice} />
        <StatCard label="Rewards" value={wallet ? "0.23 TON" : "—"} sub="This epoch"  color="#00e676" loading={!tonPrice} />
      </div>

      {/* Actions grid */}
      <div>
        <div style={{ fontSize: "11px", color: "#444", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
          Quick Actions
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {actions.map((a, i) => (
            <div key={a.label} style={{ animation: `fadeUp 0.4s ease ${0.05 * i}s both` }}>
              <ActionButton {...a} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
