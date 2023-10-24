import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type Values = {
  password: string;
  repeatPassword: string;
};

const Schema = Yup.object({
  password: Yup.string().oneOf(
    [Yup.ref("repeatPassword")],
    "Passwords must match",
  ),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match",
  ),
});

export const usePasswordForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
