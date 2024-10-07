import { defineComponent, type PropType, type SlotsType, type SetupContext } from 'vue'
import { useForm, useField, ErrorMessage, useIsSubmitting } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as Yup from 'yup'
import ArrowPathIcon from '@heroicons/vue/24/solid/ArrowPathIcon'
import { Field } from '@/components/field'
import { InputPassword } from '@/components/input-password'

export type Values = {
  password: string
  newPassword: string
}

const Schema = toTypedSchema(
  Yup.object({
    password: Yup.string().required(''),
    newPassword: Yup.string().required('')
  })
)

export const Root = defineComponent({
  setup({ onSubmit }, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => (
      <form onSubmit={onSubmit} class="space-y-4">
        <p class="text-gray-600">Change password</p>
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

export const NewPassword = defineComponent({
  setup() {
    const { value, handleChange, handleBlur } = useField('newPassword')
    return () => (
      <Field label="New password" errorMessage={<ErrorMessage name="newPassword" />}>
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
        Save
      </button>
    )
  }
})

export function usePasswordForm() {
  return useForm<Values>({
    initialValues: {
      password: '',
      newPassword: ''
    },
    validationSchema: Schema
  })
}
