import { useNavigate } from "react-router-dom";
import { UnathorizedModal } from "../components/unathorized-modal";
import { Loader } from "../components/loader";
import { useAuthenticationContext } from "../contexts/authentication-provider";

type Props = {
  children: React.ReactNode;
};

export const SessionGuard = ({ children }: Props) => {
  const { authenticating, authentication } = useAuthenticationContext();
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/");
  };

  if (authenticating) {
    return <Loader />;
  }

  if (!authenticating && !authentication.Username) {
    return <UnathorizedModal onClose={onClose} />;
  }
  return children;
};
