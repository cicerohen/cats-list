import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import * as Modal from '@/components/modal'
import * as Form from '@/components/signup-form'
import { useToaster } from '@/components/toaster'

import { useFetchApi } from '@/hooks/use-fetch-api'
import { useAuthentication } from '@/contexts/authentication-provider'

import { type Authentication } from '@app/common/types'

export const SignUpPage = defineComponent({
  setup() {
    const router = useRouter()
    const form = Form.useSignInForm()
    const toaster = useToaster()
    const auth = useAuthentication()
    const fetchApi = useFetchApi()

    const onCloseModal = () => {
      router.push('/')
    }

    const onSubmit = form.handleSubmit(async (values) => {
      return fetchApi<Authentication>('/auth/signup', 'POST', JSON.stringify(values))
        .then((data) => {
          if (auth) {
            auth.value.authentication = data.data
          }

          toaster?.value.addToast({
            text: 'Sign up sucessfuly',
            type: 'success'
          })
          onCloseModal()
        })
        .catch((error) => {
          toaster?.value.addToast({
            type: 'error',
            text: error.message
          })
        })
    })

    return () => {
      return (
        <Modal.Root open={true}>
          <Modal.Backdrop />
          <Modal.Content>
            <Modal.Header>
              <Modal.Close onClick={onCloseModal} />
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Form.Root onSubmit={onSubmit}>
              <Form.Name />
              <Form.Email />
              <Form.Password />
              <Form.RepeatPassword />
              <Form.Submit />
            </Form.Root>
          </Modal.Content>
        </Modal.Root>
      )
    }
  }
})
