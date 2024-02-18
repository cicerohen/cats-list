import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type Values = {
  email: string;
  password: string;
};

export const Schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const useSignInForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: false,
    validateOnChange: false,
  });
};
