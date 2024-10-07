import { defineComponent, type PropType, type SlotsType, type SetupContext } from 'vue'
import { useForm, useField, useIsSubmitting, useIsFormDirty, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import ArrowPathIcon from '@heroicons/vue/24/solid/ArrowPathIcon'
import * as Yup from 'yup'
import { Field } from '@/components/field'

export type Values = {
  name: string
  email: string
}

const Schema = toTypedSchema(
  Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  })
)

export const Root = defineComponent({
  setup({ onSubmit }, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => (
      <form onSubmit={onSubmit} class="space-y-4">
        {slots.default?.()}
      </form>
    )
  },
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
      required: true
    }
  }
})

export const Name = defineComponent({
  setup() {
    const { value, handleChange, handleBlur } = useField('name')

    return () => (
      <Field label="Name" errorMessage={<ErrorMessage name="name" />}>
        {() => {
          return (
            <>
              <input
                value={value.value}
                onChange={handleChange}
                onBlur={handleBlur}
                class="h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
              />
            </>
          )
        }}
      </Field>
    )
  }
})

export const Email = defineComponent({
  setup() {
    const { value, handleChange, handleBlur } = useField('email')

    return () => (
      <Field label="Email" errorMessage={<ErrorMessage name="email" />}>
        {() => {
          return (
            <>
              <input
                value={value.value}
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                class="h-12 w-full rounded-md border border-gray-300 px-4 disabled:bg-gray-100 disabled:opacity-70"
              />
            </>
          )
        }}
      </Field>
    )
  }
})

export const Submit = defineComponent({
  setup() {
    const isSubmitting = useIsSubmitting()
    const isFormDirty = useIsFormDirty()

    return () => (
      <button
        type="submit"
        disabled={isSubmitting.value || !isFormDirty.value}
        class="flex items-center rounded-md bg-green-700 px-7 py-3 text-white disabled:opacity-70"
      >
        {isSubmitting.value && <ArrowPathIcon class="mr-2 h-4 w-4 animate-spin" />}
        Save
      </button>
    )
  }
})

export function useProfileForm() {
  return useForm<Values>({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: Schema
  })
}
