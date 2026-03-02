import ActionButton from "../ActionButton";
import { delay } from "../../utils/helpers";

const SETTINGS_ITEMS = [
  { label: "Notifications", desc: "Transaction alerts", action: async () => delay(1000) },
  { label: "Security",      desc: "Manage passkeys",    action: async () => delay(1500) },
  { label: "Network",       desc: "Mainnet · TON",      action: async () => delay(800)  },
  { label: "Export Data",   desc: "Download history",   action: async () => delay(2000) },
];

export default function SettingsTab() {
  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      {SETTINGS_ITEMS.map((s, i) => (
        <div key={s.label} style={{ marginBottom: "10px", animation: `fadeUp 0.4s ease ${0.08 * i}s both` }}>
          <ActionButton icon="settings" label={s.label} description={s.desc} color="#7c83fd" action={s.action} />
        </div>
      ))}
    </div>
  );
}
