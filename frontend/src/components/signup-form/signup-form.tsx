import { FormikProvider } from "formik";
import { Button, Spinner } from "grommet";

import { Name } from "./fields/name";
import { Email } from "./fields/email";
import { Password } from "./fields/password";
import { RepeatPassword } from "./fields/repeat-password";

import { useSignUpForm } from "./use-signup-form";

export type Props = ReturnType<typeof useSignUpForm>;

export const SignUpForm = (props: Props) => {
  return (
    <div>
      <FormikProvider value={props}>
        <form onSubmit={props.handleSubmit}>
          <Name />
          <Email />
          <Password />
          <RepeatPassword />
          <Button
            type="submit"
            primary
            icon={
              (props.isSubmitting && <Spinner size="small" color="white" />) ||
              undefined
            }
            disabled={props.isSubmitting || !props.dirty}
            label="Sign up"
          />
        </form>
      </FormikProvider>
    </div>
  );
};
