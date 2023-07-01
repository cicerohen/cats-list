import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Listbox, Transition } from "@headlessui/react";
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronUpDownIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";

import { Age } from "@app/types";

type Props = {
  ages: Age[];
  onChange: (age: Age) => void;
  onBlur: () => void;
  value: Age;
  invalid: boolean;
};

export const AgeSelect = ({
  ages,
  value,
  invalid,
  onChange,
  onBlur,
}: Props) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button
          className={twMerge(
            "relative h-14 w-full cursor-default rounded-md border border-gray-300 pl-4 pr-8 ",
            invalid && [
              "border-red-500",
              "text-red-600",
              "focus:border-red-500",
              "focus:ring-red-500",
            ]
          )}
        >
          <span className="block truncate text-left">{value.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            onBlur={onBlur}
            className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {ages.map((age) => (
              <Listbox.Option
                key={age.id}
                className={({ active }) =>
                  twMerge("relative py-4 pl-10 pr-4", active && "bg-gray-100")
                }
                value={age}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={twMerge(
                        "block truncate",
                        selected && "font-medium"
                      )}
                    >
                      {age.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
