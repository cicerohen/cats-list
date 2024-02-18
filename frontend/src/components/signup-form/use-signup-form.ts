import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type Values = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const Schema = Yup.object({
  name: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email is required"),
  password: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("repeatPassword")], "Passwords must match"),
  repeatPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const useSignUpForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: false,
    validateOnChange: false,
  });
};
