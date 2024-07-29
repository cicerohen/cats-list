import { useNavigate } from "react-router-dom";

import { Modal } from "../components/modal";
import { SignUpForm, useSignUpForm } from "../components/signup-form";

import { useToasterContext } from "../components/toaster/provider";
import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useFetchApi } from "../hooks/use-fetch-api";

import { Authentication } from "@app/types";

export const SignUpPage = () => {
  const fetchApi = useFetchApi();
  const { setAuthentication } = useAuthenticationContext();
  const { addToast } = useToasterContext();

  const navigation = useNavigate();

  const onCloseModal = () => {
    navigation("/");
  };

  const form = useSignUpForm({
    onSubmit: async (values) => {
      return fetchApi<Authentication>(
        "/auth/signup",
        "POST",
        JSON.stringify(values),
      )
        .then((data) => {
          setAuthentication(data.data);
          addToast({
            text: "Sign up sucessfuly",
            type: "success",
          });
          onCloseModal();
        })
        .catch((err) => {
          addToast({
            text: err.message,
            type: "error",
          });
        });
    },
  });

  return (
    <Modal.Root show>
      <Modal.Backdrop />
      <Modal.Content>
        <Modal.Header>
          <Modal.Close onClick={onCloseModal} />
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <SignUpForm.Root {...form}>
          <SignUpForm.Name />
          <SignUpForm.Email />
          <SignUpForm.Password />
          <SignUpForm.RepeatPassword />
          <SignUpForm.Submit />
        </SignUpForm.Root>
      </Modal.Content>
    </Modal.Root>
  );
};
