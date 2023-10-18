import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";
import { SignInForm } from "../components/signin-form";
import { useSignInForm } from "../components/signin-form/use-signin-form";
import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useToasterContext } from "../components/toaster/toaster-context";
import { useFetchApi } from "../hooks/use-fetch-api";

import { Authentication } from "@app/types";

export const SignInPage = () => {
  const fetchApi = useFetchApi();
  const { setAuthentication, setAuthenticated } = useAuthenticationContext();
  const { addToast } = useToasterContext();
  const navigation = useNavigate();

  const onCloseModal = () => {
    navigation("/");
  };

  const form = useSignInForm({
    onSubmit: (values) => {
      fetchApi<Authentication>("/auth/signin", "POST", JSON.stringify(values))
        .then((data) => {
          setAuthentication(data.data);
          setAuthenticated(true);
          addToast({
            text: "Sign in sucessfuly",
            type: "success",
          });
          onCloseModal();
        })
        .catch(() => {
          addToast({
            text: "Sign in failed.",
            type: "error",
          });
        });
    },
  });

  return (
    <Modal title="Sign in" show onClose={onCloseModal}>
      <SignInForm {...form} />
    </Modal>
  );
};
