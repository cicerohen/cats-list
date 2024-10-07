import { ref } from 'vue'
import { useCatForm } from '@/components/cat-form'
import { useToaster } from '@/components/toaster'
import { useCats } from '@/contexts/cats-provider'
import { useFetchApi } from '@/hooks/use-fetch-api'

import { getDefaultHeaders, type DefaultHeaders } from '@/utils/fetch-api'
import { type Cat } from '@app/common/types'

type Parameters = {
  petForm: ReturnType<typeof useCatForm>
}

export function useOnChangePhotoHandler({ petForm }: Parameters) {
  const toaster = useToaster()
  const cats = useCats()
  const fetchApi = useFetchApi()
  const loading = ref<boolean>(false)

  const onChangePhoto = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) {
      return
    }

    loading.value = true
    const formData = new FormData()
    formData.append('file', file)
    formData.append('catId', petForm.values.id)

    const headers: DefaultHeaders = getDefaultHeaders()
    delete headers['Content-Type']

    fetchApi<Cat['photo']>('/photos', 'POST', formData, {
      headers
    })
      .then((data) => {
        if (data.data) {
          petForm.setFieldValue('photo', data.data)
          cats?.value.fetchCats()
        }
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
    onChangePhoto,
    loading
  }
}
