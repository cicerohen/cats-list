import { ref } from 'vue'
import { useCatForm, initialValues } from '@/components/cat-form'
import { useToaster } from '@/components/toaster'
import { useCats } from '@/contexts/cats-provider'
import { useFetchApi } from '@/hooks/use-fetch-api'

import { type Cat } from '@app/common/types'

type Parameters = {
  petForm: ReturnType<typeof useCatForm>
}

export function useOnRemovePhotoHandler({ petForm }: Parameters) {
  const toaster = useToaster()
  const cats = useCats()
  const fetchApi = useFetchApi()
  const loading = ref<boolean>(false)

  const onRemovePhoto = () => {
    if (!petForm.values.photo.key) {
      return
    }
    loading.value = true
    fetchApi<Cat['photo']>(
      `/photos/${petForm.values.photo.key}?catId=${petForm.values.id}`,
      'DELETE'
    )
      .then(() => {
        petForm.setFieldValue('photo', initialValues.photo)
        toaster?.value.addToast({
          type: 'success',
          text: 'Photo was removed'
        })
        cats?.value.fetchCats()
      })
      .catch((error) => {
        toaster?.value.addToast({
          type: 'error',
          text: error.message
        })
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    onRemovePhoto,
    loading
  }
}
