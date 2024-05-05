import { FormikProvider } from "formik";
import { Button, Spinner } from "grommet";

import { useProfileForm } from "./use-profile-form";
import { usePasswordForm } from "./use-password-form";

import { Name } from "./fields/name";
import { Email } from "./fields/email";
import { Password } from "./fields/password";
import { NewPassword } from "./fields/new-password";

export type Props = {
  profileForm: ReturnType<typeof useProfileForm>;
  passwordForm: ReturnType<typeof usePasswordForm>;
};

export const ProfileForm = ({ profileForm, passwordForm }: Props) => {
  return (
    <div className="space-y-8">
      <FormikProvider value={profileForm}>
        <form className="space-y-4" onSubmit={profileForm.handleSubmit}>
          <Name />
          <Email />
          <Button
            type="submit"
            icon={
              (profileForm.isSubmitting && (
                <Spinner size="xsmall" color="white" />
              )) ||
              undefined
            }
            primary
            label="Save"
            disabled={profileForm.isSubmitting || !profileForm.dirty}
          />
        </form>
      </FormikProvider>
      <FormikProvider value={passwordForm}>
        <form className="space-y-4" onSubmit={passwordForm.handleSubmit}>
          <p className="text-gray-600">Change password</p>
          <Password />
          <NewPassword />
          <Button
            type="submit"
            icon={
              (passwordForm.isSubmitting && (
                <Spinner size="xsmall" color="white" />
              )) ||
              undefined
            }
            primary
            label="Save"
            disabled={
              passwordForm.isSubmitting ||
              !passwordForm.dirty ||
              !passwordForm.isValid
            }
          />
        </form>
      </FormikProvider>
    </div>
  );
};
