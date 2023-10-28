import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";
import { ProfileForm } from "../components/profile-form";
import { useProfileForm } from "../components/profile-form/use-profile-form";
import { usePasswordForm } from "../components/profile-form/use-password-form";
import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useFetchApi } from "../hooks/use-fetch-api";
import { useToasterContext } from "../components/Toaster/toaster-context";

import { UserAttributes } from "@app/types";

export const ProfilePage = () => {
  const { addToast } = useToasterContext();
  const { authentication, setAuthentication } = useAuthenticationContext();
  const fetchApi = useFetchApi();
  const navigation = useNavigate();

  const profileForm = useProfileForm({
    onSubmit: async (values, helpers) => {
      return fetchApi<UserAttributes>("/me", "PATCH", JSON.stringify(values))
        .then((res) => {
          setAuthentication({ ...authentication, UserAttributes: res.data });
          addToast({
            text: "Profile updated sucessfuly",
            type: "success",
          });
          helpers.resetForm({
            values: {
              name: res.data.name,
              email: res.data.email,
            },
          });
        })
        .catch(() => {
          addToast({
            text: "Profile update failed.",
            type: "error",
          });
        });
    },
  });

  const passwordForm = usePasswordForm({
    onSubmit: async (values, helpers) => {
      return fetchApi<UserAttributes>(
        "/change-password",
        "PATCH",
        JSON.stringify(values),
      )
        .then(() => {
          addToast({
            text: "Password updated sucessfuly",
            type: "success",
          });
        })
        .catch((err) => {
          addToast({
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          helpers.resetForm();
        });
    },
  });

  const onCloseModal = () => {
    navigation("/");
  };

  useEffect(() => {
    profileForm.resetForm({
      values: {
        name: authentication.UserAttributes?.name || "",
        email: authentication.UserAttributes?.email || "",
      },
    });
  }, []);

  return (
    <Modal show title="Edit profile" onClose={onCloseModal}>
      <ProfileForm profileForm={profileForm} passwordForm={passwordForm} />
    </Modal>
  );
};
