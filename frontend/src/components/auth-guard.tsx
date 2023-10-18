import { useNavigate } from "react-router-dom";
import { UnathorizedModal } from "./unathorized-modal";
import { useAuthenticationContext } from "../contexts/authentication-provider";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { authenticated, authenticating } = useAuthenticationContext();
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/");
  };

  if (!authenticating && !authenticated) {
    return <UnathorizedModal onClose={onClose} />;
  }
  return children;
};
