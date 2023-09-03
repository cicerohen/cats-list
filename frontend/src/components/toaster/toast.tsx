import { Fragment, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Transition } from "@headlessui/react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { useToasterContext } from "./toaster-context";

import { Toast as ToastType } from "./types";

export const Toast = ({ id, type, text }: ToastType) => {
  const [show, setShow] = useState(false);
  const { removeToast } = useToasterContext();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 0);

    const time = setTimeout(() => {
      setShow(false);
    }, 8000);

    return () => {
      clearTimeout(time);
    };
  }, []);

  const onDismissToast = () => {
    setShow(false);
  };

  const afterLeave = () => {
    setTimeout(() => {
      removeToast(id);
    }, 0);
  };

  return (
    <div>
      <Transition
        as={Fragment}
        show={show}
        unmount={true}
        entered="transition-all duration-500"
        enter="transition-all"
        enterFrom="translate-x-[102%]"
        enterTo="translate-x-[-5%]"
        leave="transition-all duration-500 ease-in-out"
        leaveFrom="translate-x-[-5%]"
        leaveTo="translate-x-[102%]"
        afterLeave={afterLeave}
      >
        <div
          className={twMerge(
            "relative flex max-w-xs items-center  rounded-md border-2 border-b bg-white py-4 pl-2 pr-7 shadow-lg",
            type === "info" && "border-b-sky-600",
            type === "warning" && "border-b-yellow-600",
            type === "error" && "border-b-red-600",
            type === "success" && "border-b-green-600",
          )}
        >
          <button
            className="absolute right-2 top-2 text-gray-500"
            onClick={onDismissToast}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
          <div className="flex items-center">
            <div>
              {type === "info" && (
                <InformationCircleIcon className="mr-1 h-6 w-6 text-sky-600" />
              )}
              {type === "warning" && (
                <ExclamationTriangleIcon className="mr-1 h-6 w-6 text-yellow-600" />
              )}
              {type === "error" && (
                <ExclamationCircleIcon className="mr-1 h-6 w-6 text-red-600" />
              )}
              {type === "success" && (
                <CheckCircleIcon className="mr-1 h-6 w-6 text-green-600" />
              )}
            </div>
            <p className="text-sm">{text}</p>
          </div>
        </div>
      </Transition>
    </div>
  );
};
