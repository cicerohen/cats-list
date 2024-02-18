import * as Yup from "yup";

import { useFormik, FormikConfig } from "formik";

export type PassswordValues = {
  password: string;
  newPassword: string;
};

export const PasswordSchema = Yup.object({
  password: Yup.string().required(""),
  newPassword: Yup.string().required(""),
});

export const usePasswordForm = ({
  onSubmit,
}: Pick<FormikConfig<PassswordValues>, "onSubmit">) => {
  return useFormik<PassswordValues>({
    initialValues: {
      password: "",
      newPassword: "",
    },
    onSubmit,
    validationSchema: PasswordSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
