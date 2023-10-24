import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type Values = {
  name: string;
  email: string;
};

const Schema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  repeatPassword: Yup.string().required("Password is required"),
});

export const useProfileForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      name: "dsdsdsdsdsd",
      email: "blabla@gmail.com",
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
