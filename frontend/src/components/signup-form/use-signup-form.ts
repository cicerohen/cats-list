import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type Values = {
  name: string;
  email: string;
  password: string;
};

const Schema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const useSignUpForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
