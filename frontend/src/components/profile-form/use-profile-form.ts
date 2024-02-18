import * as Yup from "yup";
import { useFormik, FormikConfig } from "formik";

export type ProfileValues = {
  name: string;
  email: string;
};

export const ProfileSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const useProfileForm = ({
  onSubmit,
}: Pick<FormikConfig<ProfileValues>, "onSubmit">) => {
  return useFormik<ProfileValues>({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit,
    validationSchema: ProfileSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });
};
