import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";
import { ProfileForm } from "../components/profile-form";

import { useProfileForm } from "../components/profile-form/use-profile-form";
import { usePasswordForm } from "../components/profile-form/use-password-form";
import { useToasterContext } from "../components/toaster/provider";
import { useFetchApi } from "../hooks/use-fetch-api";
import { useAuthenticationContext } from "../contexts/authentication-provider";

import { UserAttributes, Authentication } from "@app/types";

export const ProfilePage = () => {
  const { addToast } = useToasterContext();
  const { authentication, setAuthentication } = useAuthenticationContext();
  const fetchApi = useFetchApi();
  const navigation = useNavigate();

  const profileForm = useProfileForm({
    onSubmit: async (values, helpers) => {
      return fetchApi<Authentication>("/me", "PATCH", JSON.stringify(values))
        .then((res) => {
          setAuthentication({
            ...authentication,
            UserAttributes: res.data.UserAttributes,
          });
          addToast({
            text: "Profile was updated",
            type: "success",
          });
          helpers.resetForm({
            values: {
              name: res.data.UserAttributes?.name || "",
              email: res.data.UserAttributes?.email || "",
            },
          });
        })
        .catch((error) => {
          addToast({
            type: "error",
            text: error.message,
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
            text: "Password was updated",
            type: "success",
          });
        })
        .catch((err) => {
          addToast({
            type: "error",
            text: err.message,
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
