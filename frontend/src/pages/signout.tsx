import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuthenticationContext } from "../contexts/authentication-provider";

export const SignoutPage = () => {
  const { setAuthenticated, setAuthentication } = useAuthenticationContext();

  useEffect(() => {
    setAuthenticated(false);
    setAuthentication({});
  }, []);

  return <Navigate to="/" />;
};
