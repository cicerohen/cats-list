import * as Yup from "yup";
import { useMemo } from "react";
import { useFormik, FormikConfig, FormikState } from "formik";
import { createEditor } from "slate";

import { withReact } from "slate-react";
import { Cat } from "@app/types";

import { resetEditor } from "../services/editor-api";

export type Values = Omit<Cat, "thumbnail">;

const Schema = Yup.object({
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
});

export const usePetEditForm = ({
  onSubmit,
  initialValues,
}: Pick<FormikConfig<Values>, "onSubmit" | "initialValues">) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const formik = useFormik<Values>({
    initialValues,
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const resetForm = (nextState?: Partial<FormikState<Values>>) => {
    if (nextState?.values?.description) {
      resetEditor(editor, JSON.parse(nextState.values.description));
    }
    formik.resetForm(nextState);
  };

  return {
    ...formik,
    editor,
    resetForm,
  };
};
