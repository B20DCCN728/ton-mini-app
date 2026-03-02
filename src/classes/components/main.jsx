import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { TonConnectUIProvider } from "@tonconnect/ui-react"; // ← enable for PROD
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <TonConnectUIProvider manifestUrl="https://your-domain.vercel.app/tonconnect-manifest.json"> */}
      <App />
    {/* </TonConnectUIProvider> */}
  </StrictMode>
);
