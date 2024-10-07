import {
  FormikProvider,
  useFormik,
  useFormikContext,
  FormikConfig,
} from "formik";
import * as Yup from "yup";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { Field } from "../field";
import { InputPassword } from "../input-password";

export const SignInForm = {
  Root,
  Email,
  Password,
  Submit,
};

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInFormSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Root({
  children,
  ...rest
}: React.PropsWithChildren<ReturnType<typeof useSignInForm>>) {
  return (
    <FormikProvider value={rest}>
      <form className="space-y-4" onSubmit={rest.handleSubmit}>
        {children}
      </form>
    </FormikProvider>
  );
}
function Email() {
  return (
    <Field<SignInFormValues["email"]> name="email" label="Email">
      {({ field }) => {
        return (
          <input
            id={field.name}
            name={field.name}
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
function Password() {
  return (
    <Field<SignInFormValues["password"]> name="password" label="Password">
      {({ field, form }) => {
        return (
          <InputPassword
            id={field.name}
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
function Submit() {
  const { isSubmitting, dirty } = useFormikContext();
  return (
    <button
      type="submit"
      disabled={isSubmitting || !dirty}
      className="flex items-center rounded-md bg-green-700 px-7 py-3 text-white disabled:opacity-70"
    >
      {isSubmitting && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      Sign in
    </button>
  );
}

export function useSignInForm({
  onSubmit,
}: Pick<FormikConfig<SignInFormValues>, "onSubmit">) {
  return useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: SignInFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
}
