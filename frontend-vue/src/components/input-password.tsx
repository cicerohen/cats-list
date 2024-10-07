import { defineComponent, ref, type PropType, type SetupContext, type SlotsType } from 'vue'
import EyeSlashIcon from '@heroicons/vue/24/solid/EyeSlashIcon'
import EyeIcon from '@heroicons/vue/24/solid/EyeIcon'

export const InputPassword = defineComponent({
  setup(props) {
    const show = ref(false)

    return () => (
      <div class="relative flex h-12 w-full rounded-md border border-gray-300 disabled:bg-gray-100 disabled:opacity-70">
        <input
          {...props}
          type={(show.value && 'text') || 'password'}
          class="w-full flex-1 rounded-md px-4 pr-10"
        />
        <div class="absolute right-0 flex  h-full w-12 items-center justify-center">
          <button
            type="button"
            class="text-gray-500"
            onClick={() => {
              show.value = !show.value
            }}
          >
            {(show && <EyeIcon class=" h-5 w-5" />) || <EyeSlashIcon class=" h-5 w-5" />}
          </button>
        </div>
      </div>
    )
  },
  props: Object as PropType<HTMLInputElement>
})
