import * as Yup from "yup";
import { useMemo } from "react";
import { useFormik, FormikConfig } from "formik";
import { createEditor, Descendant } from "slate";
import { withReact } from "slate-react";

import { resetEditor } from "../../utils/slate-editor";

import { Cat } from "@app/types";

export type Values = Omit<Cat, "owner_email">;

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

export const Schema = Yup.object({
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

export const useCatForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const form = useFormik<Values>({
    initialValues,
    onSubmit,
    validationSchema: Schema,
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
};
