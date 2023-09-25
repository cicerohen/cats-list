import { HTTPMethod } from "@app/types";
import { getAuthFromStorage } from "./authentication-storage";

const API_BASE = import.meta.env.VITE_API_BASE;

const defaultHeaders = {
  "Content-Type": "application/json",
};

export type Options = Parameters<typeof fetch>[1];

export const fetchApi = async (
  resource: string,
  method: HTTPMethod = "GET",
  body?: BodyInit,
  options?: Options,
) => {
  const accessToken =
    getAuthFromStorage().AuthenticationResult?.AccessToken || "";

  return fetch(`${API_BASE}${resource}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...defaultHeaders,
    },
    body,
    ...options,
  });
};
