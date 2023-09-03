import { HTTPMethod } from "@app/types";

const API_BASE = import.meta.env.VITE_API_BASE;

const defaultHeaders = {
  "Content-Type": "application/json",
};

type Options = Parameters<typeof fetch>[1];
type Data = object | Array<object>;

export const fetchApi = async <D extends Data = Data>(
  resource: string,
  method: HTTPMethod = "GET",
  body?: BodyInit,
  options?: Options,
): Promise<{ data: D; status?: string }> => {
  const response = await fetch(`${API_BASE}${resource}`, {
    method,
    headers: {
      ...defaultHeaders,
    },
    body,
    ...options,
  });

  const res = await response.json();

  if (!response.ok) {
    throw res.error;
  }

  return res;
};
