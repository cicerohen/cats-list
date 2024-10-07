import { useAuthentication } from '@/contexts/authentication-provider'
import { fetchApi } from '@app/common/utils/fetch-api'

type Data = object | Array<object>
type Params = Parameters<typeof fetchApi>

export function useFetchApi() {
  const auth = useAuthentication()

  return async <D extends Data>(
    ...params: Params
  ): Promise<{
    data: D
    status: string
  }> => {
    const res = await fetchApi(...params)
    const json = await res.json()

    if (res.status === 401 && auth) {
      auth.value.authentication = {}
    }

    if (!res.ok) {
      throw json.error
    }
    return json
  }
}
