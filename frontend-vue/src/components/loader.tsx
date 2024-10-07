import { defineComponent } from 'vue'
import { twMerge } from 'tailwind-merge'
import ArrowPathIcon from '@heroicons/vue/24/solid/ArrowPathIcon'

export const Loader = defineComponent({
  setup(_, { attrs }) {
    return () => {
      return (
        <p
          class={twMerge(
            'fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-white/75 text-gray-700',
            attrs.class
          )}
        >
          <span class="flex items-center space-x-2 rounded-full border border-gray-200 bg-white p-2 shadow-lg">
            <ArrowPathIcon class="h-5 w-5 animate-spin" />
          </span>
        </p>
      )
    }
  }
})
