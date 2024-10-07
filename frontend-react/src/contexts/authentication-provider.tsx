import { createContext, useContext, useEffect, useState } from "react";
import { Authentication } from "@app/types";
import {
  getAuthFromStorage,
  setAuthToStorage,
} from "../utils/authentication-storage";

import { fetchApi } from "../utils/fetch-api";

export type AuthenticationContext = {
  authentication: Authentication;
  authenticating: boolean;
  setAuthentication: (authentication: Authentication) => void;
  setAuthenticating: (authenticating: boolean) => void;
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

  const value = {
    authentication,
    authenticating,
    setAuthentication,
    setAuthenticating,
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        setAuthenticating(true);

        const res = await fetchApi("/me");

        if (res.status === 401) {
          setAuthentication({});
          return;
        }

        const json = await res.json();
        setAuthentication({
          ...authentication,
          ...json.data,
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
