import { useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";

type Props = {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
};

export const Panel = ({ title, isOpen, children, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = (isOpen && "hidden") || "";
  }, [isOpen]);

  return createPortal(
    <section
      className={twMerge(
        "fixed bottom-0 top-0 z-10  bg-white transition-all duration-200",
        (isOpen && "translate-x-0") || "translate-x-full",
      )}
    >
      <header className="sticky top-0 z-10 border-b border-b-gray-200 bg-white">
        <div className="flex h-20 items-center justify-between px-8 lg:container lg:mx-auto lg:px-0">
          <h3 className="text-3xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="flex items-center rounded-md px-3 py-2 text-sm font-semibold"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>
      </header>
      <div className="absolute top-0 h-full w-full overflow-y-auto px-8 pb-8 pt-24 ">
        <div className="lg:container lg:mx-auto">{isOpen && children}</div>
      </div>
    </section>,
    document.body,
  );
};
