import { createContext, useContext, useEffect, useState } from "react";
import { Authentication } from "@app/types";
import {
  getAuthFromStorage,
  setAuthToStorage,
} from "../services/authentication-storage";

import { fetchApi } from "../services/fetch-api";

export type AuthenticationContext = {
  authentication: Authentication;
  authenticating: boolean;
  authenticated: boolean;
  setAuthentication: (authentication: Authentication) => void;
  setAuthenticating: (authenticating: boolean) => void;
  setAuthenticated: (authenticated: boolean) => void;
};

const AuthenticationContext = createContext({} as AuthenticationContext);

type Props = {
  children: React.ReactNode;
};

export const AuthenticationProvider = ({ children }: Props) => {
  const [authentication, setAuthentication] = useState<Authentication>(
    getAuthFromStorage(),
  );
  const [authenticating, setAuthenticating] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState(false);

  const value = {
    authentication,
    authenticating,
    authenticated,
    setAuthentication,
    setAuthenticating,
    setAuthenticated,
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setAuthenticating(true);

        const res = await fetchApi("/me");

        if (res.status === 401) {
          setAuthenticated(false);
          return;
        }

        const json = await res.json();

        setAuthenticated(true);
        setAuthentication({
          ...authentication,
          UserAttributes: json.data.UserAttributes,
        });
      } finally {
        setAuthenticating(false);
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    setAuthToStorage(authentication);
  }, [authentication]);

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
