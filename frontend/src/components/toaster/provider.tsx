import { useState, createContext, useContext } from "react";

import { Toast } from "./types";

type ToastMap = Map<Toast["id"], Toast>;

type ToasterContext = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: Toast["id"]) => void;
};

type Props = {
  children?: React.ReactNode;
};

const uid = () => Math.random().toString(16).slice(2);

export const ToasterContext = createContext({} as ToasterContext);

export const ToasterProvider = ({ children }: Props) => {
  const [toasts, setToasts] = useState<ToastMap>(new Map());

  const addToast: ToasterContext["addToast"] = (toast) => {
    setToasts((prev) => {
      const next = new Map(prev);
      const id = uid();
      next.set(id, { id, ...toast });
      return next;
    });
  };

  const removeToast: ToasterContext["removeToast"] = (id) => {
    setToasts((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  const value = {
    toasts: Array.from(toasts.values()),
    addToast,
    removeToast,
  };

  return (
    <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>
  );
};

export const useToasterContext = () => useContext(ToasterContext);
