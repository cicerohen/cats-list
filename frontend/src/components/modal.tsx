import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Loader } from "../components/loader";

export type Props = {
  title: string;
  description?: string;
  show: boolean;
  showLoader?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  classNames?: Record<"panel", string>;
};

export const Modal = ({
  title,
  description,
  show,
  children,
  className,
  classNames,
  showLoader,
  onClose,
}: Props) => {
  return (
    <div>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className={twMerge("relative z-10", className)}
          onClose={() => null}
          open={show}
          tabIndex={0}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={twMerge(
                    " w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all",
                    classNames?.panel,
                  )}
                >
                  {showLoader && <Loader />}
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold text-gray-600"
                    >
                      {title}
                    </Dialog.Title>
                    {description && (
                      <Dialog.Description>{description}</Dialog.Description>
                    )}
                    <button
                      className="absolute right-5 top-5"
                      onClick={onClose}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="pt-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
