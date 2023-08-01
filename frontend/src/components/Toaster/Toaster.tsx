import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "./Toast";

import { useToasterContext } from "../../contexts/Toaster";

export const Toaster = () => {
  const [container, setContainer] = useState<HTMLElement>();
  const { toasts } = useToasterContext();

  useEffect(() => {
    if (!document.getElementById("toast")) {
      const el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
      setContainer(el);
    } else {
      setContainer(document.getElementById("toast") as HTMLElement);
    }
  }, []);

  return (
    container &&
    createPortal(
      <div className="fixed top-0 right-0 z-10 space-y-2 py-4">
        {toasts.slice(0, 5).map((toast) => {
          return <Toast key={toast.id} {...toast} />;
        })}
      </div>,
      container
    )
  );
};
