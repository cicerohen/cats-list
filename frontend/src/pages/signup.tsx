import { useNavigate } from "react-router-dom";

import { Modal } from "../components/modal";
import { SignUpForm } from "../components/signup-form/signup-form";
import { useSignUpForm } from "../components/signup-form/use-signup-form";

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
    <Modal title="Sign up" show onClose={onCloseModal}>
      <SignUpForm {...form} />
    </Modal>
  );
};
