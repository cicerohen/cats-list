import { useState, useMemo, useRef, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import {
  FormikProvider,
  FormikConfig,
  useFormik,
  useFormikContext,
} from "formik";
import { BaseEditor, Descendant, createEditor } from "slate";
import {
  ReactEditor,
  Editable,
  Slate,
  RenderLeafProps,
  withReact,
} from "slate-react";

import * as Yup from "yup";
import ChevronUpDownIcon from "@heroicons/react/20/solid/ChevronUpDownIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import PhotoIcon from "@heroicons/react/24/outline/PhotoIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

import { Leaf } from "../slate-editor/leaf";
import { MarkButton } from "../slate-editor/mark-button";
import { Field } from "../field";

import { resetEditor } from "../../utils/slate-editor";

import { Cat, Breed as BreedType, Age as AgeType } from "@app/types";

type CatFormValues = Omit<Cat, "owner_email">;

const CatFormSchema = Yup.object({
  id: Yup.string().optional(),
  photo: Yup.object({
    key: Yup.string(),
    url: Yup.string(),
  }).optional(),
  name: Yup.string().required("Name is required"),
  breed: Yup.object()
    .shape({ name: Yup.string(), id: Yup.string() })
    .test("breed", "Breed is required", (value) => {
      return Boolean(value.id && value.name);
    }),
  age: Yup.object()
    .shape({ name: Yup.string(), id: Yup.string() })
    .test("age", "Age is required", (value) => {
      return Boolean(value.id && value.name);
    }),
  description: Yup.string().optional(),
});

const DEFAULT_EDITOR_VALUE: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

export const initialValues = {
  id: "",
  name: "",
  breed: { id: "", name: "" },
  age: { id: "", name: "" },
  description: JSON.stringify(DEFAULT_EDITOR_VALUE),
  photo: {
    key: "",
    url: "",
  },
};

type RootProps = React.PropsWithChildren<ReturnType<typeof useCatForm>>;

export const CatForm = {
  Root,
  Photo,
  Name,
  Age,
  Breed,
  Description,
  ActionButtons,
  Submit,
  Remove,
};

export function Root({ children, ...rest }: RootProps) {
  return (
    <FormikProvider value={rest}>
      <form className="space-y-4" onSubmit={rest.handleSubmit}>
        <div className="flex flex-col justify-center">{children}</div>
      </form>
    </FormikProvider>
  );
}

function Name() {
  const { isSubmitting } = useFormikContext();
  return (
    <Field<CatFormValues["name"]> name="name" label="Name">
      {({ field }) => {
        return (
          <input
            placeholder="Enter your cat name"
            disabled={isSubmitting}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
          />
        );
      }}
    </Field>
  );
}

function Breed({ breeds }: { breeds: BreedType[] }) {
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
    <Field<CatFormValues["breed"]> name="breed" label="Breed">
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
                  placeholder="Select the cat breed"
                  name={field.name}
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
}

function Age({ ages }: { ages: AgeType[] }) {
  const { setFieldValue, validateForm, isSubmitting } = useFormikContext();

  return (
    <Field<CatFormValues["age"]> name="age" label="Age">
      {({ field }) => {
        return (
          <Listbox
            disabled={isSubmitting}
            value={field.value}
            onChange={(age) => {
              setFieldValue(field.name, age);
            }}
          >
            <div className="relative">
              <Listbox.Button
                aria-label="Select the cat age"
                className="relative h-12 w-full cursor-default rounded-md border border-gray-300 pl-4 pr-8 disabled:bg-gray-100 disabled:opacity-70"
              >
                <span className="block truncate text-left">
                  {field.value.name}
                </span>
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
                  onBlur={() => {
                    validateForm();
                  }}
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {ages.map((age) => (
                    <Listbox.Option
                      key={age.id}
                      className={({ active }) =>
                        twMerge(
                          "relative py-4 pl-10 pr-4",
                          active && "bg-gray-100",
                        )
                      }
                      value={age}
                    >
                      <>
                        <span
                          className={twMerge(
                            "block truncate",
                            field.value.id === age.id && "font-medium",
                          )}
                        >
                          {age.name}
                        </span>
                        {field.value.id === age.id ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        );
      }}
    </Field>
  );
}

function Description({ editor }: { editor: BaseEditor & ReactEditor }) {
  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
  const { setFieldValue, isSubmitting } = useFormikContext();

  const onChange = (e: Descendant[]) => {
    setFieldValue("description", JSON.stringify(e));
  };

  return (
    <Field name="description" label="Description">
      {() => {
        return (
          <Slate
            editor={editor}
            initialValue={[
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ]}
            onChange={onChange}
          >
            <div
              className={twMerge(
                "rounded-md border border-gray-300",
                isSubmitting && "bg-gray-100",
              )}
            >
              <section className="border-b border-gray-200">
                <div className="flex space-x-2 p-4">
                  <MarkButton mark="bold" disabled={isSubmitting} />
                  <MarkButton mark="italic" disabled={isSubmitting} />
                  <MarkButton mark="underline" disabled={isSubmitting} />
                </div>
              </section>
              <Editable
                placeholder="Describe your cat"
                className="p-4"
                readOnly={isSubmitting}
                renderLeaf={renderLeaf}
              />
            </div>
          </Slate>
        );
      }}
    </Field>
  );
}

function Photo({
  loading,
  onChange,
  onRemove,
}: {
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  const { isSubmitting } = useFormikContext();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Field<CatFormValues["photo"]> name="photo" label="">
      {({ field }) => {
        return (
          <div className="mx-auto w-40">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-gray-300">
              {field.value && (
                <div
                  style={
                    {
                      "--bg-url": `url(${field.value.url})`,
                    } as React.CSSProperties
                  }
                  className="h-full w-full rounded-full bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat"
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
                disabled={loading || isSubmitting}
                title="Change photo"
                aria-label="Change photo"
                onChange={onChangeHandler}
                accept=".jpg, .jpeg, .png"
                className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-full opacity-0"
              />
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                title="Remove current photo"
                disabled={
                  !field.value.key ||
                  !field.value.url ||
                  loading ||
                  isSubmitting
                }
                className="flex items-center rounded-md border border-red-100 px-3 py-1 text-xs text-red-600  enabled:hover:bg-red-100 disabled:opacity-50"
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
}

function ActionButtons({ children }: React.PropsWithChildren) {
  return <div className="flex items-center gap-4">{children}</div>;
}

function Submit({ disabled }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isSubmitting } = useFormikContext();
  return (
    <button
      title="Save cat"
      type="submit"
      disabled={disabled}
      className="flex items-center rounded-md bg-green-700 px-7 py-3 text-white disabled:opacity-70"
    >
      {isSubmitting && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      Save
    </button>
  );
}

function Remove({
  disabled,
  loading,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading: boolean }) {
  return (
    <button
      title="Remove cat"
      type="button"
      disabled={disabled}
      className="flex items-center rounded-md px-7 py-3 text-red-600 enabled:hover:bg-red-100 disabled:opacity-70"
      {...rest}
    >
      {loading && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      Remove cat
    </button>
  );
}

export function useCatForm({
  onSubmit,
}: Pick<FormikConfig<CatFormValues>, "onSubmit">) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const form = useFormik<CatFormValues>({
    initialValues,
    onSubmit,
    validationSchema: CatFormSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const resetForm: typeof form.resetForm = (nextState) => {
    form.resetForm(nextState);
    resetEditor(
      editor,
      (nextState?.values?.description &&
        JSON.parse(nextState.values.description)) ||
        DEFAULT_EDITOR_VALUE,
    );
  };

  return {
    ...form,
    resetForm,
    editor,
  };
}
