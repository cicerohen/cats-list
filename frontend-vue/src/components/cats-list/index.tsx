import { defineComponent, type SetupContext, type SlotsType } from 'vue'
import { Loader } from '@/components/loader'

export const Root = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => {
      return <div class="relative z-0 min-h-[800px]">{slots.default?.()}</div>
    }
  }
})

export const Body = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => {
      return <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{slots.default?.()}</div>
    }
  }
})

export function Empty() {
  return <p class="text-center text-gray-600">No cats to show</p>
}
