import {
  defineComponent,
  Teleport,
  ref,
  reactive,
  type Ref,
  type SlotsType,
  type SetupContext,
  provide,
  inject,
  onMounted,
  onBeforeUnmount,
  computed
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
import InformationCircleIcon from '@heroicons/vue/24/outline/InformationCircleIcon'
import ExclamationTriangleIcon from '@heroicons/vue/24/outline/ExclamationTriangleIcon'
import ExclamationCircleIcon from '@heroicons/vue/24/outline/ExclamationCircleIcon'
import CheckCircleIcon from '@heroicons/vue/24/outline/CheckCircleIcon'

type Toast = {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  text: string
}

type ToastMap = Map<Toast['id'], Toast>

type ToasterContext = {
  toaster: {
    toasts: ToastMap
  }
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: Toast['id']) => void
}

const uid = () => Math.random().toString(16).slice(2)

export const ToasterProvider = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    const toaster = reactive({
      toasts: new Map()
    })

    const addToast: ToasterContext['addToast'] = (toast) => {
      const next = new Map(toaster.toasts)
      const id = uid()
      next.set(id, { id, ...toast })
      toaster.toasts = next
    }

    const removeToast: ToasterContext['removeToast'] = (id) => {
      const next = new Map(toaster.toasts)
      next.delete(id)
      toaster.toasts = next
    }

    const context = ref({
      toaster,
      addToast,
      removeToast
    })

    provide('toaster', context)

    return () => <div>{slots.default?.()}</div>
  }
})

const Toast = defineComponent({
  setup({ id, type, text }: Toast) {
    const toaster = useToaster()
    const show = ref(false)

    const onDismissToast = () => {
      show.value = false
    }

    const onAfterLeave = () => {
      setTimeout(() => {
        toaster?.value.removeToast(id)
      }, 0)
    }

    onMounted(() => {
      setTimeout(() => {
        show.value = true
      }, 0)
      const time = setTimeout(() => {
        show.value = false
      }, 8000)

      onBeforeUnmount(() => {
        clearTimeout(time)
      })
    })
    return () => (
      <div>
        <TransitionRoot
          appear
          show={show.value}
          unmount
          entered="transition-all duration-500"
          enter="transition-all"
          enterFrom="translate-x-[100%]"
          enterTo="translate-x-[-10%]"
          leave="transition-all duration-500 ease-in-out"
          leaveFrom="translate-x-[-10%]"
          leaveTo="translate-x-[110%]"
          onAfterLeave={onAfterLeave}
        >
          <div class="relative flex max-w-xs items-center rounded-md border border-gray-200 bg-white py-4 pl-3 pr-7 shadow-xl">
            <button onClick={onDismissToast} class="absolute right-2 top-2 text-gray-500">
              <XMarkIcon class="h-4 w-4" />
            </button>
            <div class="flex items-center">
              <div>
                {type === 'info' && <InformationCircleIcon class="mr-1 h-7 w-7 text-sky-600" />}
                {type === 'warning' && (
                  <ExclamationTriangleIcon class="mr-1 h-7 w-7 text-yellow-600" />
                )}
                {type === 'error' && <ExclamationCircleIcon class="mr-1 h-7 w-7 text-red-600" />}
                {type === 'success' && <CheckCircleIcon class="mr-1 h-7 w-7 text-green-600" />}
              </div>
              <p class="text-sm">{text}</p>
            </div>
          </div>
        </TransitionRoot>
      </div>
    )
  },
  props: ['id', 'type', 'text']
})

export const Toaster = defineComponent({
  setup() {
    const toaster = useToaster()

    return () => (
      <div>
        <Teleport to="body">
          <div class="fixed right-0 top-0 z-20 space-y-2 pr-2 py-4">
            {toaster &&
              Array.from(toaster.value.toaster.toasts.values())
                .slice(0, 5)
                .map((toast) => {
                  return <Toast key={toast.id} {...toast} />
                })}
          </div>
        </Teleport>
      </div>
    )
  }
})

export function useToaster() {
  return inject<Ref<ToasterContext>>('toaster')
}
