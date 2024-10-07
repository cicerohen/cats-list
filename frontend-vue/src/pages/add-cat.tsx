import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFetchApi } from '@/hooks/use-fetch-api'
import { useOnSubmitPetFormHandler } from '@/hooks/use-onsubmit-pet-form-handler'
import { useOnChangePhotoHandler } from '@/hooks/use-onchange-photo-handler'
import { useOnRemovePhotoHandler } from '@/hooks/use-onremove-photo-handler'

import * as Modal from '@/components/modal'
import * as Form from '@/components/cat-form'

import { type Age, type Breed } from '@app/common/types'

export const AddCatPage = defineComponent({
  setup() {
    const ages = ref<Age[]>([])
    const breeds = ref<Breed[]>([])
    const router = useRouter()
    const fetchApi = useFetchApi()

    const { petForm, onSubmit } = useOnSubmitPetFormHandler()
    const { onChangePhoto, loading: loadingOnChangePhoto } = useOnChangePhotoHandler({ petForm })
    const { onRemovePhoto, loading: loadingOnRemovePhoto } = useOnRemovePhotoHandler({ petForm })

    const onCloseModal = () => {
      router.go(-1)
    }

    onMounted(() => {
      Promise.all([fetchApi<Age[]>('/ages'), fetchApi<Breed[]>('/breeds')]).then((res) => {
        ages.value = res[0].data
        breeds.value = res[1].data
      })
    })

    return () => {
      return (
        <Modal.Root open={true}>
          <Modal.Backdrop />
          <Modal.Content>
            <Modal.Header>
              <Modal.Close onClick={onCloseModal} />
              <Modal.Title>Add a cat</Modal.Title>
            </Modal.Header>
            <Form.Root onSubmit={onSubmit}>
              <Form.Photo
                onChange={onChangePhoto}
                onRemove={onRemovePhoto}
                loading={loadingOnChangePhoto.value || loadingOnRemovePhoto.value}
              />
              <Form.Name />
              <Form.Breed breeds={breeds.value} />
              <Form.Age ages={ages.value} />
              <Form.Submit />
            </Form.Root>
          </Modal.Content>
        </Modal.Root>
      )
    }
  }
})
