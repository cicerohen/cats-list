import React, { useState } from "react";
import { ToasterContext } from "./ToasterContext";

export type Toast = {
  id: string;
  type: "success" | "warning" | "error" | "info";
  text: string;
};

type ToastMap = Map<Toast["id"], Toast>;

type Props = {
  children?: React.ReactNode;
};

const uid = () => Math.random().toString(16).slice(2);

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
