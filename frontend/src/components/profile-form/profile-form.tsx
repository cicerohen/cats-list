import { FormikProvider } from "formik";
import { useProfileForm } from "./use-profile-form";
import { usePasswordForm } from "./use-password-form";

import { Name } from "./fields/name";
import { Email } from "./fields/email";
import { Password } from "./fields/password";
import { NewPassword } from "./fields/new-password";

import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";

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
            disabled={profileForm.isSubmitting || !profileForm.dirty}
            className="flex items-center rounded-md  border border-gray-200 bg-lime-600  px-5 py-2 font-medium text-white disabled:opacity-50"
          >
            {profileForm.isSubmitting && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </form>
      </FormikProvider>
      <FormikProvider value={passwordForm}>
        <form className="space-y-4" onSubmit={passwordForm.handleSubmit}>
          <p className="text-gray-600">Change password</p>
          <Password />
          <NewPassword />
          <button
            type="submit"
            disabled={
              passwordForm.isSubmitting ||
              !passwordForm.dirty ||
              !passwordForm.isValid
            }
            className="flex items-center rounded-md  border border-gray-200 bg-lime-600  px-5 py-2 font-medium text-white disabled:opacity-50"
          >
            {passwordForm.isSubmitting && <ArrowPathIcon className="h-5 w-5" />}
            <span>Save</span>
          </button>
        </form>
      </FormikProvider>
    </div>
  );
};
