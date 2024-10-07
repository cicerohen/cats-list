import {
  defineComponent,
  type SlotsType,
  type PropType,
  type SetupContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes
} from 'vue'
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  DialogDescription,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import { twMerge } from 'tailwind-merge'
import XMarkIcon from '@heroicons/vue/24/solid/XMarkIcon'

export const Root = defineComponent({
  setup({ open }, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => {
      return (
        <div>
          <TransitionRoot appear show={open}>
            <Dialog as="div" class="relative z-10" onClose={() => null} open={open}>
              <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                  {slots.default?.()}
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
        </div>
      )
    }
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  }
})

export const Header = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="pb-4">{slots.default?.()}</div>
  }
})

export const Title = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => (
      <DialogTitle as="h3" class="text-lg font-semibold text-gray-600">
        {slots.default?.()}
      </DialogTitle>
    )
  }
})

export const Description = DialogDescription

export const Content = defineComponent({
  setup(_, { slots, attrs }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => {
      return (
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPanel
            class={twMerge(
              'w-full max-w-2xl transform  rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all',
              attrs.class
            )}
          >
            {slots.default?.()}
          </DialogPanel>
        </TransitionChild>
      )
    }
  }
})

export const Backdrop = defineComponent({
  setup() {
    return () => (
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
    )
  }
})

export const Close = defineComponent({
  setup({ onClick }) {
    return () => (
      <button class="absolute right-5 top-5" onClick={onClick}>
        <XMarkIcon class="h-5 w-5" />
      </button>
    )
  },
  props: {
    onClick: Object as PropType<HTMLAttributes['onClick']>
  }
})
