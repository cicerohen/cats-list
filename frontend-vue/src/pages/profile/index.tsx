import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as Modal from '@/components/modal'
import { PasswordForm } from './password-form'
import { ProfileForm } from './profile-form'
export const ProfilePage = defineComponent({
  setup() {
    const router = useRouter()

    const onCloseModal = () => {
      router.push('/')
    }

    return () => {
      return (
        <Modal.Root open={true}>
          <Modal.Backdrop />
          <Modal.Content>
            <Modal.Header>
              <Modal.Close onClick={onCloseModal} />
              <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <div class="space-y-4">
              <ProfileForm />
              <PasswordForm />
            </div>
          </Modal.Content>
        </Modal.Root>
      )
    }
  }
})
