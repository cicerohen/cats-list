import { defineComponent, type PropType, type SlotsType, type SetupContext } from 'vue'
import { useForm, useField, ErrorMessage, useIsSubmitting } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as Yup from 'yup'
import ArrowPathIcon from '@heroicons/vue/24/solid/ArrowPathIcon'
import { Field } from '@/components/field'
import { InputPassword } from '@/components/input-password'

export type Values = {
  email: string
  password: string
}

const Schema = toTypedSchema(
  Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
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

export const Password = defineComponent({
  setup() {
    const { value, handleChange, handleBlur } = useField('password')
    return () => (
      <Field label="Password" errorMessage={<ErrorMessage name="password" />}>
        {() => {
          return <InputPassword value={value.value} onChange={handleChange} onBlur={handleBlur} />
        }}
      </Field>
    )
  }
})

export const Submit = defineComponent({
  setup() {
    const isSubmitting = useIsSubmitting()

    return () => (
      <button
        type="submit"
        disabled={isSubmitting.value}
        class="flex items-center rounded-md bg-green-700 px-7 py-3 text-white disabled:opacity-70"
      >
        {isSubmitting.value && <ArrowPathIcon class="mr-2 h-4 w-4 animate-spin" />}
        Sign in
      </button>
    )
  }
})

export function useSignInForm() {
  return useForm<Values>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Schema
  })
}
