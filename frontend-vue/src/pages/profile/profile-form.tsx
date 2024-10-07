import { defineComponent, onMounted } from 'vue'
import * as Form from '@/components/profile-form'
import { useToaster } from '@/components/toaster'
import { useAuthentication } from '@/contexts/authentication-provider'
import { useFetchApi } from '@/hooks/use-fetch-api'

import { type Authentication } from '@app/common/types'

export const ProfileForm = defineComponent({
  setup() {
    const form = Form.useProfileForm()
    const auth = useAuthentication()
    const toaster = useToaster()
    const fetchApi = useFetchApi()

    const onSubmit = form.handleSubmit(async (values) => {
      return fetchApi<Authentication>('/me', 'PATCH', JSON.stringify(values))
        .then((res) => {
          if (auth) {
            auth.value.authentication = {
              ...auth.value.authentication,
              UserAttributes: res.data.UserAttributes
            }
          }

          toaster?.value.addToast({
            text: 'Profile was updated',
            type: 'success'
          })

          form.resetForm({
            values: {
              name: res.data.UserAttributes?.name || '',
              email: res.data.UserAttributes?.email || ''
            }
          })
        })
        .catch((error) => {
          toaster?.value.addToast({
            type: 'error',
            text: error.message
          })
        })
    })

    onMounted(() => {
      form.resetForm({
        values: {
          name: auth?.value.authentication.UserAttributes?.name || '',
          email: auth?.value.authentication.UserAttributes?.email || ''
        }
      })
    })

    return () => {
      return (
        <Form.Root onSubmit={onSubmit}>
          <Form.Name />
          <Form.Email />
          <Form.Submit />
        </Form.Root>
      )
    }
  }
})
