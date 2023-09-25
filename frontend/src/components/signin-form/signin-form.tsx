import { useSignInForm } from "./use-signin-form";
import { FormField } from "../form-field";

export type Props = ReturnType<typeof useSignInForm>;

export const SignInForm = ({
  values,
  errors,
  isSubmitting,
  dirty,
  handleSubmit,
  handleBlur,
  handleChange,
}: Props) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormField label="Email" errorMessage={errors.email}>
        <input
          name="email"
          disabled={isSubmitting}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
        />
      </FormField>
      <FormField label="Password" errorMessage={errors.password}>
        <input
          name="password"
          disabled={isSubmitting}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
        />
      </FormField>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-lime-600 px-7  py-3 text-white"
      >
        {isSubmitting && "aa"}
        Save
      </button>
    </form>
  );
};
