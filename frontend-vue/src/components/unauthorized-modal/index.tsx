import { defineComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import * as Modal from '@/components/modal'

export const UnathorizedModal = defineComponent({
  setup({ onClose }) {
    const route = useRoute()

    return () => (
      <Modal.Root open={route.path !== '/signin'}>
        <Modal.Backdrop />
        <Modal.Content class="max-w-lg">
          <Modal.Header>
            <Modal.Close onClick={onClose} />
            <Modal.Title>Unauthorized</Modal.Title>
            <Modal.Description>Oops! It looks like you're not authenticated.</Modal.Description>
          </Modal.Header>
          <RouterLink
            to="/signin"
            class="inline-block rounded-md bg-green-700 px-5 py-3 text-white"
          >
            Sign in
          </RouterLink>
        </Modal.Content>
      </Modal.Root>
    )
  },
  props: {
    onClose: {
      type: Function
    }
  }
})
