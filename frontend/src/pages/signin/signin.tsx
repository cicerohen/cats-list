import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal";
import { SignInForm } from "../../components/signin-form";
import { useSignInForm } from "../../components/signin-form/use-signin-form";
import {
  useAuthenticationContext,
  AuthenticationContext,
} from "../../contexts/authentication-provider";
import { useToasterContext } from "../../components/toaster/toaster-context";
import { useFetchApi } from "../../hooks/use-fetch-api";

export const SignInPage = () => {
  const fetchApi = useFetchApi();
  const { setAuthentication, setAuthenticated } = useAuthenticationContext();
  const { addToast } = useToasterContext();
  const navigation = useNavigate();

  const form = useSignInForm({
    onSubmit: (values) => {
      return fetchApi<AuthenticationContext["authentication"]>(
        "/auth/signin",
        "POST",
        JSON.stringify(values),
      )
        .then((data) => {
          setAuthentication(data.data);
          setAuthenticated(true);
          addToast({
            text: "Sign in sucessfuly",
            type: "success",
          });
        })
        .catch(() => {
          addToast({
            text: "Sign in failed.",
            type: "error",
          });
        });
    },
  });

  const onClose = () => {
    navigation(-1);
  };

  return (
    <Modal title="Sign in" show onClose={onClose}>
      <SignInForm {...form} />
    </Modal>
  );
};
