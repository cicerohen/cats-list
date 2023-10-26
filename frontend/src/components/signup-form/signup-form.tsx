import { FormikProvider } from "formik";
import { useSignUpForm } from "./use-signup-form";

import { Name } from "./fields/name";
import { Email } from "./fields/email";
import { Password } from "./fields/password";

export type Props = ReturnType<typeof useSignUpForm>;

export const SignUpForm = (props: Props) => {
  return (
    <div className="space-y-8">
      <FormikProvider value={props}>
        <form className="space-y-4" onSubmit={props.handleSubmit}>
          <Name />
          <Email />
          <Password />
          <button
            type="submit"
            disabled={props.isSubmitting}
            className="rounded-md bg-lime-600 px-7  py-3 text-white"
          >
            Register
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};
