import { defineComponent, type SlotsType, type SetupContext } from 'vue'
import { useRouter } from 'vue-router'
import { Loader } from '@/components/loader'
import { UnathorizedModal } from '@/components/unauthorized-modal'
import { useAuthentication } from '@/contexts/authentication-provider'

export const SessionGuard = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    const auth = useAuthentication()
    const router = useRouter()

    const onClose = () => {
      router.go(-1)
    }

    return () => {
      if (auth?.value.authenticating) {
        return <Loader />
      }

      if (!auth?.value.authenticating && !auth?.value.authentication.Username) {
        return <UnathorizedModal onClose={onClose} />
      }
      return slots.default?.()
    }
  }
})
