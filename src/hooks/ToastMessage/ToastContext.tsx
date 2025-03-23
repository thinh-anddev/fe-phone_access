import React, { useState, createContext, useEffect, ReactNode } from "react";

interface Toast {
  message: string;
  icon?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ContextProps {
  showToast: (message: string, icon?: ReactNode) => void;
  hideToast: () => void;
  toast: Toast | null;
}

export const ToastContext = createContext<ContextProps>({
  showToast: () => {},
  hideToast: () => {},
  toast: null,
});

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, icon: ReactNode) => {
    setToast({ message, icon });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000); // Adjust the duration as needed (in milliseconds)
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const contextValue: ContextProps = {
    showToast,
    hideToast,
    toast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};
