import { HTTPMethod } from "@app/types";
import { getAuthFromStorage } from "./authentication-storage";

const API_BASE = import.meta.env.VITE_API_BASE;

export const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${
    getAuthFromStorage().AuthenticationResult?.AccessToken || ""
  }`,
});

export type DefaultHeaders = Partial<ReturnType<typeof getDefaultHeaders>>;

type Options = Parameters<typeof fetch>[1];
type Data = object | Array<object>;

export const fetchApi = async (
  resource: string,
  method: HTTPMethod = "GET",
  body?: BodyInit,
  options?: Options,
) => {
  return fetch(`${API_BASE}${resource}`, {
    method,
    headers: getDefaultHeaders(),
    body,
    ...options,
  });
};
