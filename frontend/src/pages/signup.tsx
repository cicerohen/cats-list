import { useNavigate } from "react-router-dom";

import { Modal } from "../components/modal";
import { SignUpForm } from "../components/signup-form/signup-form";
import { useSignUpForm } from "../components/signup-form/use-signup-form";

export const SignUpPage = () => {
  const form = useSignUpForm({
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const navigation = useNavigate();

  const onCloseModal = () => {
    navigation("/");
  };

  return (
    <Modal title="Sign up" show onClose={onCloseModal}>
      <SignUpForm {...form} />
    </Modal>
  );
};
