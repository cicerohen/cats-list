import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatForm, initialValues } from '@/components/cat-form'
import { useToaster } from '@/components/toaster'
import { useCats } from '@/contexts/cats-provider'
import { useFetchApi } from '@/hooks/use-fetch-api'

import { type Cat } from '@app/common/types'

export function useOnSubmitPetFormHandler() {
  const toaster = useToaster()
  const cats = useCats()
  const fetchApi = useFetchApi()
  const router = useRouter()

  const petForm = useCatForm()

  const onSubmit = petForm.handleSubmit(async (values) => {
    const isNew = !values.id

    if (isNew) {
      return fetchApi('/cats', 'POST', JSON.stringify(values))
        .then(() => {
          petForm.resetForm({
            values: initialValues
          })

          toaster?.value.addToast({
            type: 'success',
            text: 'Cat was added'
          })

          cats?.value.fetchCats()
          router.go(-1)
        })
        .catch((error) => {
          toaster?.value.addToast({
            type: 'error',
            text: error.message
          })
        })

      return
    }

    return fetchApi<Cat>(`/cats/${values.id}`, 'PATCH', JSON.stringify(values))
      .then((data) => {
        petForm.resetForm({
          values: data.data
        })

        toaster?.value.addToast({
          type: 'success',
          text: 'Cat was updated'
        })

        cats?.value.fetchCats()
      })
      .catch((error) => {
        toaster?.value.addToast({
          type: 'error',
          text: error.message
        })
      })
  })

  return {
    petForm,
    onSubmit
  }
}
