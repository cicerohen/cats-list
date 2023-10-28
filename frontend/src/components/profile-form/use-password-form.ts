import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type Values = {
  password: string;
  newPassword: string;
};

const Schema = Yup.object({
  password: Yup.string().required(""),
  newPassword: Yup.string().required(""),
});

export const usePasswordForm = ({
  onSubmit,
}: Pick<FormikConfig<Values>, "onSubmit">) => {
  return useFormik<Values>({
    initialValues: {
      password: "",
      newPassword: "",
    },
    onSubmit,
    validationSchema: Schema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
