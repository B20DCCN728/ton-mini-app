import { useState, useEffect } from "react";

/**
 * Hook: get current Telegram user info
 *
 * DEV  → simulates user after 800ms
 * PROD → swap the setTimeout block with:
 *   import WebApp from "@twa-dev/sdk";
 *   WebApp.ready(); WebApp.expand();
 *   const tgUser = WebApp.initDataUnsafe?.user;
 *   if (tgUser) setUser(tgUser);
 */
export function useTelegramSDK() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setUser({ first_name: "Alex", last_name: "Nguyen", id: 987654321, username: "alexnguyen" });
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return { user };
}
