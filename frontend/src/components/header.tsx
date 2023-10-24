import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserIcon";

import { UserAttributes } from "@app/types";

type Props = {
  userAttributes?: UserAttributes;
};

export const Header = ({ userAttributes }: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-lime-600">
      <div className="flex h-20  items-center justify-between px-8 lg:container lg:mx-auto lg:px-0">
        <h1 className="font-semibold text-white">
          <Link to="/">Cat Shelf</Link>
        </h1>
        <div className="flex space-x-2">
          <Link
            to="/cats/new"
            className="flex items-center rounded-md border border-white px-3 py-2 text-white"
          >
            <PlusIcon className="h-6 w-6" />
            Add a cat
          </Link>

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
                        {userAttributes && (
                          <div className="flex items-center px-4 py-5">
                            <UserCircleIcon className="mr-2 h-8 w-8 text-gray-600" />
                            <div>
                              <p className="text-sm font-semibold">
                                Cicero Viana
                              </p>
                              <p className="text-sm">{userAttributes.email}</p>
                            </div>
                          </div>
                        )}
                        <div>
                          {userAttributes && (
                            <Link
                              to="/profile"
                              className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                            >
                              Editar perfil
                            </Link>
                          )}
                          {userAttributes && (
                            <button className="block w-full  px-4 py-3 text-left hover:bg-gray-100">
                              Sign out
                            </button>
                          )}

                          {!userAttributes && (
                            <Link
                              to="/signin"
                              className="block w-full px-4 py-3 text-left hover:bg-gray-100"
                            >
                              Sign in
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </header>
  );
};
