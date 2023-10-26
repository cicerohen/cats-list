import { fetchApi } from "../services/fetch-api";
import { useAuthenticationContext } from "../contexts/authentication-provider";

type Data = object | Array<object>;
type Params = Parameters<typeof fetchApi>;

export const useFetchApi = () => {
  const { setAuthenticated } = useAuthenticationContext();

  return async <D extends Data = Data>(
    ...params: Params
  ): Promise<{
    data: D;
    status: string;
  }> => {
    const res = await fetchApi(...params);
    const json = await res.json();

    if (res.status === 401) {
      setAuthenticated(false);
    }

    if (!res.ok) {
      throw json.error;
    }
    return json;
  };
};
