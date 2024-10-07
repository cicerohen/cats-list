import {
  FormikProvider,
  useFormik,
  FormikConfig,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { Field } from "../field";
import { InputPassword } from "../input-password";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

export const PasswordForm = {
  Root,
  Password,
  NewPassword,
  Submit,
};

const PasswordFormSchema = Yup.object({
  password: Yup.string().required(""),
  newPassword: Yup.string().required(""),
});

type PasswordFormValues = {
  password: string;
  newPassword: string;
};

function Root({
  children,
  ...rest
}: React.PropsWithChildren<ReturnType<typeof usePasswordForm>>) {
  return (
    <FormikProvider value={rest}>
      <form className="space-y-4" onSubmit={rest.handleSubmit}>
        <p className="text-gray-600">Change password</p>
        {children}
      </form>
    </FormikProvider>
  );
}

function Password() {
  return (
    <Field<PasswordFormValues["password"]> name="password" label="Password">
      {({ field, form }) => {
        return (
          <InputPassword
            name={field.name}
            disabled={form.isSubmitting}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );
      }}
    </Field>
  );
}

function NewPassword() {
  return (
    <Field<PasswordFormValues["newPassword"]>
      name="newPassword"
      label="New password"
    >
      {({ field, form }) => {
        return (
          <InputPassword
            name={field.name}
            disabled={form.isSubmitting}
            onPaste={(e) => e.preventDefault()}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        );
      }}
    </Field>
  );
}

function Submit() {
  const { isSubmitting, dirty, isValid } = useFormikContext();

  return (
    <button
      type="submit"
      disabled={isSubmitting || !dirty || !isValid}
      className="flex items-center rounded-md  border border-gray-200 bg-green-700  px-5 py-2 font-medium text-white disabled:opacity-50"
    >
      {isSubmitting && <ArrowPathIcon className="h-5 w-5" />}
      <span>Save</span>
    </button>
  );
}

export function usePasswordForm({
  onSubmit,
}: Pick<FormikConfig<PasswordFormValues>, "onSubmit">) {
  return useFormik<PasswordFormValues>({
    initialValues: {
      password: "",
      newPassword: "",
    },
    onSubmit,
    validationSchema: PasswordFormSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });
}
