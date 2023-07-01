import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

import { Breed, Age } from "@app/types";

export type Values = {
  id: string;
  name: string;
  breed: Breed;
  age: Age;
};

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
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      id: "",
      name: "",
      breed: { id: 0, name: "" },
      age: { id: 0, name: "" },
    },

    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
