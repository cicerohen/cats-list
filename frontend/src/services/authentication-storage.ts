import { Authentication } from "@app/types";

const key = "react-aws-authentication";

export const getAuthFromStorage = (): Authentication => {
  return JSON.parse(window.localStorage.getItem(key) as string) || {};
};

export const setAuthToStorage = (authentication: Authentication): void => {
  window.localStorage.setItem(key, JSON.stringify(authentication));
};
