import {
  FormikProvider,
  FormikConfig,
  useFormikContext,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { Field } from "../field";

import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

export const ProfileForm = {
  Root,
  Name,
  Email,
  Submit,
};

type ProfileFormValues = {
  name: string;
  email: string;
};

const ProfileFormSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function Root({
  children,
  ...rest
}: React.PropsWithChildren<ReturnType<typeof useProfileForm>>) {
  return (
    <FormikProvider value={rest}>
      <form className="space-y-4" onSubmit={rest.handleSubmit}>
        {children}
      </form>
    </FormikProvider>
  );
}
function Name() {
  return (
    <Field<ProfileFormValues["name"]> name="name" label="Name">
      {({ field, form }) => {
        return (
          <input
            name={field.name}
            disabled={form.isSubmitting}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
          />
        );
      }}
    </Field>
  );
}
function Email() {
  return (
    <Field<ProfileFormValues["email"]> name="email" label="Email">
      {({ field }) => {
        return (
          <input
            name={field.name}
            disabled
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
          />
        );
      }}
    </Field>
  );
}
function Submit() {
  const { isSubmitting, dirty } = useFormikContext();
  return (
    <button
      type="submit"
      disabled={isSubmitting || !dirty}
      className="flex items-center rounded-md  border border-gray-200 bg-green-700 px-5 py-2 font-medium text-white disabled:opacity-50"
    >
      {isSubmitting && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      <span>Save</span>
    </button>
  );
}

export function useProfileForm({
  onSubmit,
}: Pick<FormikConfig<ProfileFormValues>, "onSubmit">) {
  return useFormik<ProfileFormValues>({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit,
    validationSchema: ProfileFormSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });
}
