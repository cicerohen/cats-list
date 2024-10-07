import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";

export const Modal = {
  Root,
  Backdrop,
  Content,
  Header,
  Title,
  Description: Dialog.Description,
  Close,
};

function Root({ show, children }: React.PropsWithChildren<{ show: boolean }>) {
  return (
    <div>
      <Transition appear show={show}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => null}
          open={show}
          tabIndex={0}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              {children}
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function Header({ children }: React.PropsWithChildren) {
  return <div className="pb-4">{children}</div>;
}

function Content({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
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
          "w-full max-w-2xl transform  rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all",
          className,
        )}
      >
        {children}
      </Dialog.Panel>
    </Transition.Child>
  );
}

function Backdrop() {
  return (
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
  );
}

function Title({ children }: React.PropsWithChildren) {
  return (
    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-600">
      {children}
    </Dialog.Title>
  );
}

function Close(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="absolute right-5 top-5" {...props}>
      <XMarkIcon className="h-5 w-5" />
    </button>
  );
}
