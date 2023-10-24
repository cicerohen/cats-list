import { FormikProvider } from "formik";
import { useProfileForm } from "./use-profile-form";
import { usePasswordForm } from "./use-password-form";

import { Name } from "./fields/name";
import { Email } from "./fields/email";
import { Password } from "./fields/password";
import { RepeatPassword } from "./fields/repeat-password";

import { InputPassword } from "../input-password";

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
          <button
            type="submit"
            disabled={profileForm.isSubmitting}
            className=" rounded-md border border-gray-200 px-5 py-2 font-medium text-gray-600"
          >
            Save
          </button>
        </form>
      </FormikProvider>
      <FormikProvider value={passwordForm}>
        <form className="space-y-4" onSubmit={passwordForm.handleSubmit}>
          <p className="text-gray-600">Change password</p>
          <Password />
          <RepeatPassword />
          <button
            type="submit"
            disabled={passwordForm.isSubmitting || !passwordForm.dirty}
            className=" rounded-md border border-gray-200 px-5 py-2 text-gray-600"
          >
            Save
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};
