import { FormikProvider } from "formik";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

import { Email } from "./fields/email";
import { Password } from "./fields/password";

import { useSignInForm } from "./use-signin-form";

export type Props = ReturnType<typeof useSignInForm>;

export const SignInForm = (props: Props) => {
  return (
    <FormikProvider value={props}>
      <form className="space-y-4" onSubmit={props.handleSubmit}>
        <Email />
        <Password />
        <button
          type="submit"
          disabled={props.isSubmitting || !props.dirty}
          className="flex items-center rounded-md bg-green-700 px-7 py-3 text-white disabled:opacity-70"
        >
          {props.isSubmitting && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign in
        </button>
      </form>
    </FormikProvider>
  );
};
