import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatForm, initialValues } from '@/components/cat-form'
import { useToaster } from '@/components/toaster'
import { useCats } from '@/contexts/cats-provider'
import { useFetchApi } from '@/hooks/use-fetch-api'

type Parameters = {
  petForm: ReturnType<typeof useCatForm>
}

export function useOnRemovePetHandler({ petForm }: Parameters) {
  const toaster = useToaster()
  const cats = useCats()
  const fetchApi = useFetchApi()
  const loading = ref<boolean>(false)
  const route = useRoute()
  const router = useRouter()

  const onRemovePet = () => {
    loading.value = true
    fetchApi(`/cats/${route.params.id}`, 'DELETE')
      .then(() => {
        petForm.resetForm({
          values: initialValues
        })
        toaster?.value.addToast({
          type: 'success',
          text: 'Cat was removed'
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
      .finally(() => {
        loading.value = false
      })
  }

  return {
    onRemovePet,
    loading
  }
}
