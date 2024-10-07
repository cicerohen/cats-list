import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import UserCircleIcon from "@heroicons/react/24/solid/UserIcon";

import { useAuthenticationContext } from "../contexts/authentication-provider";

export const UserMenu = () => {
  const { authentication } = useAuthenticationContext();

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            onClick={() => {}}
            className="rounded-full border border-white  p-2 text-white"
          >
            <UserCircleIcon className="h-6 w-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0  z-10 mt-3 w-72 rounded-lg border border-gray-100 bg-white shadow-md">
              <div>
                <div>
                  {authentication.UserAttributes && (
                    <div className="flex items-center px-4 py-5">
                      <UserCircleIcon className="mr-2 h-8 w-8 text-gray-600" />
                      <div>
                        <p className="text-sm font-semibold">
                          {authentication.UserAttributes.name}
                        </p>
                        <p className="text-sm">
                          {authentication.UserAttributes.email}
                        </p>
                      </div>
                    </div>
                  )}
                  <div>
                    {authentication.UserAttributes && (
                      <Link
                        to="/profile"
                        className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                      >
                        Editar perfil
                      </Link>
                    )}
                    {authentication.UserAttributes && (
                      <Link
                        to="/signout"
                        className="block w-full  px-4 py-3 text-left hover:bg-gray-100"
                      >
                        Sign out
                      </Link>
                    )}

                    {!authentication.UserAttributes && (
                      <>
                        <Link
                          to="/signin"
                          className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
