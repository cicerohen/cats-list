import { useEffect } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { PetEditForm, Props as PetEditFormProps } from "./PetEditForm";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  formProps: PetEditFormProps;
};

export const PetEditPanel = ({ isOpen = true, formProps, onClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = (isOpen && "hidden") || "";
  }, [isOpen]);

  const title = `${(formProps.values.id && "Edit cat") || "Add cat"}`;

  return createPortal(
    <section
      className={twMerge(
        "fixed bottom-0 top-0 z-10 h-full w-full bg-white transition-all duration-200",
        (isOpen && "translate-x-0") || "translate-x-full"
      )}
    >
      <header className="sticky z-10 top-0 border-b border-b-gray-200 bg-white">
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
      <div className="absolute top-0 pt-24 px-8 pb-8 w-full h-full overflow-y-auto ">
        <div className="lg:container lg:mx-auto">
          <PetEditForm {...formProps} />
        </div>
      </div>
    </section>,
    document.body
  );
};
