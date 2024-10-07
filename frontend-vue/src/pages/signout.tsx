import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthentication } from '@/contexts/authentication-provider'

export const SignOutPage = defineComponent({
  setup() {
    const auth = useAuthentication()
    const router = useRouter()
    onMounted(() => {
      if (auth) {
        auth.value.authentication = {}
        router.push('/')
      }
    })

    return () => {
      return null
    }
  }
})
