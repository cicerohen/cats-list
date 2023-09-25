import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";
import { Cat } from "@app/types";

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

export const usePetForm = ({
  onSubmit,
}: Pick<FormikConfig<Cat>, "onSubmit">) => {
  return useFormik<Cat>({
    initialValues: {
      id: "",
      name: "",
      breed: { id: 0, name: "" },
      age: { id: 0, name: "" },
      description: JSON.stringify([
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
      ]),
      photo: {
        key: "",
        url: "",
      },
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
