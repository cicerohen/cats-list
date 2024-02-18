import { FormikProvider } from "formik";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

import { Name } from "./fields/name";
import { Email } from "./fields/email";
import { Password } from "./fields/password";
import { RepeatPassword } from "./fields/repeat-password";

import { useSignUpForm } from "./use-signup-form";

export type Props = ReturnType<typeof useSignUpForm>;

export const SignUpForm = (props: Props) => {
  return (
    <div className="space-y-8">
      <FormikProvider value={props}>
        <form className="space-y-4" onSubmit={props.handleSubmit}>
          <Name />
          <Email />
          <Password />
          <RepeatPassword />
          <button
            type="submit"
            disabled={props.isSubmitting || !props.dirty}
            className="flex items-center rounded-md  bg-green-700 px-7 py-3 text-white disabled:opacity-70"
          >
            {props.isSubmitting && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};
