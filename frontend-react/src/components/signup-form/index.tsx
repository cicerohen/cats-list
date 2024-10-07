import {
  FormikProvider,
  FormikConfig,
  useFormikContext,
  useFormik,
} from "formik";
import * as Yup from "yup";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { InputPassword } from "../input-password";
import { Field } from "../field";

export const SignUpForm = {
  Root,
  Name,
  Email,
  Password,
  RepeatPassword,
  Submit,
};

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const SignUpFormSchema = Yup.object({
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

function Root({
  children,
  ...rest
}: React.PropsWithChildren<ReturnType<typeof useSignUpForm>>) {
  return (
    <div className="space-y-8">
      <FormikProvider value={rest}>
        <form className="space-y-4" onSubmit={rest.handleSubmit}>
          {children}
        </form>
      </FormikProvider>
    </div>
  );
}
function Name() {
  return (
    <Field<SignUpFormValues["name"]> name="name" label="Name">
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
    <Field<SignUpFormValues["email"]> name="email" label="Email">
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
function Password() {
  return (
    <Field<SignUpFormValues["password"]> name="password" label="Password">
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
function RepeatPassword() {
  return (
    <Field<SignUpFormValues["repeatPassword"]>
      name="repeatPassword"
      label="Repeat password"
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
  const { isSubmitting, dirty } = useFormikContext();
  return (
    <button
      type="submit"
      disabled={isSubmitting || !dirty}
      className="flex items-center rounded-md  bg-green-700 px-7 py-3 text-white disabled:opacity-70"
    >
      {isSubmitting && <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />}
      Sign up
    </button>
  );
}

export function useSignUpForm({
  onSubmit,
}: Pick<FormikConfig<SignUpFormValues>, "onSubmit">) {
  return useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit,
    validationSchema: SignUpFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });
}
