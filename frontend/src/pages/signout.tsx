import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuthenticationContext } from "../contexts/authentication-provider";

export const SignoutPage = () => {
  const { setAuthentication } = useAuthenticationContext();

  useEffect(() => {
    setAuthentication({});
  }, []);

  return <Navigate to="/" />;
};
