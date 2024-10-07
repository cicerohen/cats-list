import {
  defineComponent,
  ref,
  type Ref,
  type SlotsType,
  type SetupContext,
  provide,
  inject
} from 'vue'

import { useFetchApi } from '@/hooks/use-fetch-api'
import { type Cat } from '@app/common/types'

type CatsContext = {
  cats: Cat[]
  loading: boolean
  fetchCats: () => void
}

export const CatsProvider = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    const cats = ref<Cat[]>([])
    const loading = ref<boolean>(false)
    const fetchApi = useFetchApi()

    const fetchCats = () => {
      loading.value = true
      fetchApi<Cat[]>('/cats')
        .then((data) => {
          cats.value = data.data
        })
        .finally(() => {
          loading.value = false
        })
    }

    const context = ref({
      cats,
      loading,
      fetchCats
    })

    provide('cats', context)

    return () => <div>{slots.default?.()}</div>
  }
})

export function useCats() {
  return inject<Ref<CatsContext>>('cats')
}
