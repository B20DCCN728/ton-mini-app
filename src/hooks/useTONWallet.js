import { useState } from "react";
import { delay } from "../classes/utils/helpers";

/**
 * Hook: manage TON wallet connect / disconnect
 *
 * DEV  → simulates connect/disconnect with delay
 * PROD → swap with @tonconnect/ui-react:
 *   import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
 *   const [tonConnectUI] = useTonConnectUI();
 *   const wallet = useTonWallet();
 *   const connect    = () => tonConnectUI.openModal();
 *   const disconnect = () => tonConnectUI.disconnect();
 */
export function useTONWallet() {
  const [wallet, setWallet] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const connect = async () => {
    setConnecting(true);
    await delay(2000);
    setWallet({
      address: "UQBv...K9mZ",
      fullAddress: "UQBvFpDMvkHQ6X3nLrT8wJkM9oPqRs2cYiAb4eNxWdCuK9mZ",
      balance: "142.87",
      usdValue: "284.31",
    });
    setConnecting(false);
  };

  const disconnect = async () => {
    setConnecting(true);
    await delay(1000);
    setWallet(null);
    setConnecting(false);
  };

  return { wallet, connecting, connect, disconnect };
}
