import { FormikProvider } from "formik";
import { Button, Spinner } from "grommet";

import { Email } from "./fields/email";
import { Password } from "./fields/password";

import { useSignInForm } from "./use-signin-form";

export type Props = ReturnType<typeof useSignInForm>;

export const SignInForm = (props: Props) => {
  return (
    <FormikProvider value={props}>
      <form onSubmit={props.handleSubmit}>
        <Email />
        <Password />
        <Button
          type="submit"
          primary
          icon={
            (props.isSubmitting && <Spinner size="small" color="white" />) ||
            undefined
          }
          label="Sign in"
          disabled={props.isSubmitting || !props.dirty}
        />
      </form>
    </FormikProvider>
  );
};
