import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastProvider } from "./hooks/ToastMessage/ToastContext.tsx";
import ToastMessage from "./hooks/ToastMessage/ToastMessage.tsx";
import { LoginProvider } from "./hooks/LoginStatus/LoginContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ToastProvider>
    <LoginProvider>
      <ToastMessage />
      <App />
    </LoginProvider>
  </ToastProvider>
  // </React.StrictMode>
);
