import { Fragment, useState } from "react";
import { useFormikContext } from "formik";
import { twMerge } from "tailwind-merge";
import { Combobox, Transition } from "@headlessui/react";
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronUpDownIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";

import { Field } from "../../field";

import { Breed as BreedType } from "@app/types";
import { Values } from "../use-cat-form";

type Props = {
  breeds: BreedType[];
};

export const Breed = ({ breeds }: Props) => {
  const { setFieldValue, validateForm, isSubmitting } = useFormikContext();
  const [query, setQuery] = useState<string>("");

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredBreeds =
    query === ""
      ? breeds
      : breeds.filter((breed) =>
          breed.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Field<Values["breed"]> name="breed" label="Breed">
      {({ field }) => {
        return (
          <Combobox
            disabled={isSubmitting}
            name={field.name}
            onChange={(breed: BreedType) => {
              setFieldValue(field.name, breed);
            }}
            value={field.value}
          >
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg border border-gray-300">
                <Combobox.Input
                  className="h-12 w-full rounded-lg border-none pl-4 pr-8 disabled:bg-gray-100 disabled:opacity-70"
                  displayValue={(breed: BreedType) => breed.name}
                  onBlur={() => {
                    validateForm();
                  }}
                  onChange={onChangeQuery}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options
                  onBlur={() => {
                    validateForm();
                  }}
                  className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {filteredBreeds.map((breed) => (
                    <Combobox.Option
                      key={breed.id}
                      className={({ active }) =>
                        twMerge(
                          "relative py-4 pl-10 pr-4",
                          active && "bg-gray-100",
                        )
                      }
                      value={breed}
                    >
                      <>
                        <span
                          className={twMerge(
                            "block truncate",
                            field.value.id === breed.id && "font-medium",
                          )}
                        >
                          {breed.name}
                        </span>
                        {field.value.id === breed.id ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        );
      }}
    </Field>
  );
};
