import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { Toast } from "./toast";

import { useToasterContext } from "./provider";

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
      <div className="fixed right-0 top-0 z-20 space-y-2 py-4">
        {toasts.slice(0, 5).map((toast) => {
          return <Toast key={toast.id} {...toast} />;
        })}
      </div>,
      container,
    )
  );
};
