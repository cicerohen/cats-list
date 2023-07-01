import { useState } from "react";
import {HTTPMethod} from "@app/types"
const API_BASE = import.meta.env.VITE_API_BASE;

export const defaultHeaders = {
  "Content-Type": "application/json",
};

type Options = Parameters<typeof fetch>[1];

type Data = object | Array<object>;

export type Return<D extends Data = Data, E  extends Error =  Error> = {
  response: {
    data?: D,
    error?: E
  },
  isFetching: boolean
  startFetch: (body?: BodyInit) => void
};

export const useFetchApi= <R extends Return = Return> (
  resource: string,
  method: HTTPMethod = "GET",
  options?: Options
): Omit<Return, keyof R> & R => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [response, setResponse] = useState<R["response"]>();

  const startFetch = async (body?: BodyInit) => {
    setIsFetching(true);
    setResponse(undefined);

    try {
      const response = await fetch(`${API_BASE}${resource}`, {
        method,
        headers: {
          ...defaultHeaders,
        },
        body,
        ...options,
      });

      const res: Return["response"] = await response.json();
      setResponse(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    isFetching,
    response,
    startFetch,
  } as unknown as  Omit<Return, keyof R> & R
};
