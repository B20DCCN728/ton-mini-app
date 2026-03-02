// Mock transaction history
// TODO: replace with real TonCenter API call
// GET https://toncenter.com/api/v2/getTransactions?address=YOUR_ADDRESS
export const TRANSACTIONS = [
  { type: "receive", label: "Received TON", amount: "+12.5 TON", time: "2m ago", color: "#00e676" },
  { type: "send",    label: "Sent to @dao", amount: "-5.0 TON",  time: "1h ago", color: "#ff4757" },
  { type: "stake",   label: "Staked",       amount: "-50 TON",   time: "3h ago", color: "#7c83fd" },
  { type: "swap",    label: "TON → USDT",   amount: "≈$42.00",   time: "1d ago", color: "#ffd32a" },
];
