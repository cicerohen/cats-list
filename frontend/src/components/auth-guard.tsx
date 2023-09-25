import { UnathorizedModal } from "./unathorized-modal";
import { useAuthenticationContext } from "../contexts/authentication-provider";
type Props = {
  children: React.ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { authenticated, authenticating } = useAuthenticationContext();

  if (!authenticating && !authenticated) {
    return <UnathorizedModal />;
  }
  return children;
};
