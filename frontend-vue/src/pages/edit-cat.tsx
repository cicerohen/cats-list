import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import * as Modal from '@/components/modal'
import * as Form from '@/components/cat-form'
import { useFetchApi } from '@/hooks/use-fetch-api'
import { useOnRemovePetHandler } from '@/hooks/use-onremove-pet-handler'
import { useOnSubmitPetFormHandler } from '@/hooks/use-onsubmit-pet-form-handler'
import { useOnChangePhotoHandler } from '@/hooks/use-onchange-photo-handler'
import { useOnRemovePhotoHandler } from '@/hooks/use-onremove-photo-handler'
import { type Cat, type Age, type Breed } from '@app/common/types'

export const EditCatPage = defineComponent({
  setup() {
    const ages = ref<Age[]>([])
    const breeds = ref<Breed[]>([])
    const fetchApi = useFetchApi()
    const router = useRouter()
    const route = useRoute()

    const { petForm, onSubmit } = useOnSubmitPetFormHandler()
    const { onChangePhoto, loading: loadingOnChangePhoto } = useOnChangePhotoHandler({ petForm })
    const { onRemovePhoto, loading: loadingOnRemovePhoto } = useOnRemovePhotoHandler({ petForm })
    const { onRemovePet, loading: loadingOnRemovePet } = useOnRemovePetHandler({ petForm })

    const onCloseModal = () => {
      router.go(-1)
    }

    onMounted(() => {
      Promise.all([
        fetchApi<Age[]>('/ages'),
        fetchApi<Breed[]>('/breeds'),
        fetchApi<Cat>(`/cats/${route.params.id}`)
      ]).then((res) => {
        ages.value = res[0].data
        breeds.value = res[1].data
        petForm.resetForm({
          values: res[2].data
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
              <Modal.Title>Edit cat</Modal.Title>
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
              <Form.Description />
              <Form.ActionButtons>
                <Form.Submit />
                <Form.Remove
                  loading={loadingOnRemovePet.value}
                  disabled={loadingOnChangePhoto.value || loadingOnRemovePhoto.value}
                  onClick={onRemovePet}
                />
              </Form.ActionButtons>
            </Form.Root>
          </Modal.Content>
        </Modal.Root>
      )
    }
  },
  name: 'EditCatPage'
})
