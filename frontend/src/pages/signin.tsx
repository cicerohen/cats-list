import { useNavigate } from "react-router-dom";

import { Modal } from "../components/modal";
import { SignInForm } from "../components/signin-form";
import { useSignInForm } from "../components/signin-form/use-signin-form";
import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useToasterContext } from "../components/toaster/provider";
import { useFetchApi } from "../hooks/use-fetch-api";

import { Authentication } from "@app/types";

export const SignInPage = () => {
  const fetchApi = useFetchApi();
  const { setAuthentication } = useAuthenticationContext();
  const { addToast } = useToasterContext();
  const navigation = useNavigate();

  const closeModal = () => {
    navigation("/");
  };

  const form = useSignInForm({
    onSubmit: async (values) => {
      return fetchApi<Authentication>(
        "/auth/signin",
        "POST",
        JSON.stringify(values),
      )
        .then((data) => {
          setAuthentication(data.data);
          addToast({
            title: "Sign in sucessfuly",
            message: "",
            status: "normal",
          });
          closeModal();
        })
        .catch(() => {
          addToast({
            status: "critical",
            title: "Unexpected error",
            message: "Try again",
          });
        });
    },
  });

  return (
    <Modal title="Sign in" show onClose={closeModal}>
      <SignInForm {...form} />
    </Modal>
  );
};
