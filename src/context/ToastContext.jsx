/**
 * Provides global toast notifications across the app.
 * Used for short success, error, and info messages after user actions.
 */

import { createContext, useCallback, useMemo, useState } from "react";

export const ToastContext = createContext(null);

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const value = useMemo(
    () => ({
      toast,
      showToast,
    }),
    [toast, showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      {toast ? (
        <div className={`toast toast--${toast.type}`}>{toast.message}</div>
      ) : null}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
