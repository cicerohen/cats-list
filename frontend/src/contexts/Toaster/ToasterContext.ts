import { createContext } from "react";

import { Toast } from "./ToasterProvider";

export type ToasterContext = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: Toast["id"]) => void;
};

export const ToasterContext = createContext({} as ToasterContext);
