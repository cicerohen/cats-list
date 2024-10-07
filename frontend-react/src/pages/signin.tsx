import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";
import { SignInForm, useSignInForm } from "../components/signin-form";
import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useToasterContext } from "../components/toaster/provider";
import { useFetchApi } from "../hooks/use-fetch-api";

import { Authentication } from "@app/types";

export const SignInPage = () => {
  const fetchApi = useFetchApi();
  const { setAuthentication } = useAuthenticationContext();
  const { addToast } = useToasterContext();
  const navigation = useNavigate();

  const onCloseModal = () => {
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
            text: "Sign in sucessfuly",
            type: "success",
          });
          onCloseModal();
        })
        .catch((error) => {
          addToast({
            type: "error",
            text: error.message,
          });
        });
    },
  });

  return (
    <Modal.Root show>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Sign In</Modal.Title>
          <Modal.Close onClick={onCloseModal} />
        </Modal.Header>
        <SignInForm.Root {...form}>
          <SignInForm.Email />
          <SignInForm.Password />
          <SignInForm.Submit />
        </SignInForm.Root>
      </Modal.Content>
    </Modal.Root>
  );
};
