import {
  defineComponent,
  ref,
  type Ref,
  type SlotsType,
  type SetupContext,
  provide,
  inject,
  watch,
  onMounted
} from 'vue'
import { type Authentication } from '@app/types'

import { getAuthFromStorage, setAuthToStorage } from '@app/common/utils/authentication-storage'
import { fetchApi } from '@app/common/utils/fetch-api'

export type AuthenticationContext = {
  authentication: Authentication
  authenticating: boolean
}

export const AuthenticationProvider = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    const context = ref<AuthenticationContext>({
      authenticating: true,
      authentication: getAuthFromStorage()
    })

    provide('authentication', context)

    watch(
      () => context.value.authentication,
      (authentication) => {
        setAuthToStorage(authentication)
      }
    )

    onMounted(async () => {
      try {
        context.value.authenticating = true
        const res = await fetchApi('/me')

        if (res.status === 401) {
          context.value.authentication = {}
          return
        }
        const json = await res.json()
        context.value.authentication = {
          ...context.value.authentication,
          ...json.data
        }
      } finally {
        context.value.authenticating = false
      }
    })

    return () => <div>{slots.default?.()}</div>
  }
})

export function useAuthentication() {
  return inject<Ref<AuthenticationContext>>('authentication')
}
