import { defineComponent, type VNode, type PropType, type SlotsType, type SetupContext } from 'vue'
export const Field = defineComponent({
  setup({ label, errorMessage }, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => (
      <div>
        {label && <span class="mb-2 block">{label}</span>}
        {slots.default?.()}
        {errorMessage && <p class="mt-2 text-sm text-red-600">{errorMessage}</p>}
      </div>
    )
  },
  props: {
    errorMessage: {
      type: Object as PropType<VNode>,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  }
})
