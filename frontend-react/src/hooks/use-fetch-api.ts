import { fetchApi } from "../utils/fetch-api";
import { useAuthenticationContext } from "../contexts/authentication-provider";

type Data = object | Array<object>;
type Params = Parameters<typeof fetchApi>;

export { getDefaultHeaders } from "../utils/fetch-api";
export type { DefaultHeaders } from "../utils/fetch-api";

export const useFetchApi = () => {
  const { setAuthentication } = useAuthenticationContext();

  return async <D extends Data>(
    ...params: Params
  ): Promise<{
    data: D;
    status: string;
  }> => {
    const res = await fetchApi(...params);
    const json = await res.json();

    if (res.status === 401) {
      setAuthentication({});
    }

    if (!res.ok) {
      throw json.error;
    }
    return json;
  };
};
