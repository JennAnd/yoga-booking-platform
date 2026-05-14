import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./context/ToastContext.jsx";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>,
);
