import { useRef } from "react";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

import { Field } from "../../field";
import { Values } from "../use-cat-form";

type Props = {
  loading: boolean;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

export const Photo = ({ loading, disabled, onChange, onRemove }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Field<Values["photo"]> name="photo" label="">
      {({ field }) => {
        return (
          <div className="w-40">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-gray-300">
              {field.value && (
                <div
                  style={
                    {
                      "--bg-url": `url(${field.value.url})`,
                    } as React.CSSProperties
                  }
                  className="h-40 w-40 rounded-full bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat"
                ></div>
              )}
              {!field.value.url && (
                <div className="lef-0 absolute top-0 flex h-40 w-40 items-center justify-center rounded-full">
                  <PhotoIcon className="h-8 w-8 text-gray-300" />
                </div>
              )}

              {loading && (
                <div className="absolute left-0 top-0 z-10 flex h-40 w-40 items-center justify-center rounded-full bg-black/80">
                  <ArrowPathIcon className="h-5 w-5 animate-spin text-white" />
                </div>
              )}

              <input
                ref={inputFileRef}
                type="file"
                disabled={disabled}
                title="Change photo"
                onChange={onChangeHandler}
                accept=".jpg, .jpeg, .png"
                className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-full opacity-0"
              />
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                title="Remove current photo"
                disabled={!field.value.key || !field.value.url || disabled}
                className="flex items-center rounded-md border border-red-100 px-3 py-1 text-xs text-red-600 enabled:hover:bg-red-100 disabled:opacity-50"
                onClick={onRemove}
              >
                <TrashIcon className="mr-1 h-4 w-4" />
                <span>Remove photo</span>
              </button>
            </div>
          </div>
        );
      }}
    </Field>
  );
};
