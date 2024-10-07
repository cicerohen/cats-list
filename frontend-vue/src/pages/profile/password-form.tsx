import { defineComponent } from 'vue'
import * as Form from '@/components/password-form'
import { useToaster } from '@/components/toaster'
import { useFetchApi } from '@/hooks/use-fetch-api'

export const PasswordForm = defineComponent({
  setup() {
    const form = Form.usePasswordForm()
    const toaster = useToaster()
    const fetchApi = useFetchApi()

    const onSubmit = form.handleSubmit(async (values) => {
      return fetchApi('/change-password', 'PATCH', JSON.stringify(values))
        .then(() => {
          toaster?.value.addToast({
            text: 'Password was updated',
            type: 'success'
          })
        })
        .catch((error) => {
          toaster?.value.addToast({
            type: 'error',
            text: error.message
          })
        })
        .finally(() => {
          form.resetForm()
        })
    })

    return () => {
      return (
        <Form.Root onSubmit={onSubmit}>
          <Form.Password />
          <Form.NewPassword />
          <Form.Submit />
        </Form.Root>
      )
    }
  }
})
