import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Listbox, Transition } from "@headlessui/react";
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronUpDownIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";

import { FormField, Props as FormFieldProps } from "../form-field";
import { Age } from "@app/types";

type Props = Omit<FormFieldProps, "children"> & {
  ages: Age[];
  value: Age;
  invalid: boolean;
  disabled: boolean;
  onChange: (age: Age) => void;
  onBlur: () => void;
};

export const AgeField = ({
  label,
  errorMessage,
  ages,
  value,
  invalid,
  disabled,
  onChange,
  onBlur,
}: Props) => {
  return (
    <FormField label={label} invalid={invalid} errorMessage={errorMessage}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className="relative h-12 w-full cursor-default rounded-md border border-gray-300 pl-4 pr-8 disabled:bg-gray-100 disabled:opacity-70">
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
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                          selected && "font-medium",
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
    </FormField>
  );
};
