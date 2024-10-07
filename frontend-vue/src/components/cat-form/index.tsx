import {
  defineComponent,
  ref,
  computed,
  onMounted,
  type PropType,
  type SlotsType,
  type SetupContext
} from 'vue'

import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import { useForm, useField, useIsSubmitting, ErrorMessage } from 'vee-validate'
import { twMerge } from 'tailwind-merge'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { toTypedSchema } from '@vee-validate/yup'
import ArrowPathIcon from '@heroicons/vue/24/solid/ArrowPathIcon'
import CheckIcon from '@heroicons/vue/24/solid/CheckIcon'
import ChevronUpDownIcon from '@heroicons/vue/24/solid/ChevronUpDownIcon'
import PhotoIcon from '@heroicons/vue/24/outline/PhotoIcon'
import TrashIcon from '@heroicons/vue/24/outline/TrashIcon'

import * as Yup from 'yup'
import { Field } from '@/components/field'

import { type Cat, type Breed as BreedType, type Age as AgeType } from '@app/common/types'

export const initialValues = {
  id: '',
  name: '',
  photo: {
    url: '',
    key: ''
  },
  breed: { id: '', name: '' },
  age: { id: '', name: '' },
  description: ''
}

type Values = Omit<Cat, 'owner_email'>

const Schema = toTypedSchema(
  Yup.object({
    id: Yup.string().optional(),
    photo: Yup.object({
      key: Yup.string(),
      url: Yup.string()
    }).optional(),
    name: Yup.string().required('Name is required'),
    breed: Yup.object()
      .shape({ name: Yup.string(), id: Yup.string() })
      .test('breed', 'Breed is required', (value) => {
        return Boolean(value.id && value.name)
      }),
    age: Yup.object()
      .shape({ name: Yup.string(), id: Yup.string() })
      .test('age', 'Age is required', (value) => {
        return Boolean(value.id && value.name)
      })
    // description: Yup.string().optional()
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
  name: 'CatForm',
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
      required: true
    }
  }
})

export const Photo = defineComponent({
  setup(props) {
    const { value } = useField<Values['photo']>('photo')
    const isSubmitting = useIsSubmitting()
    const inputFileRef = ref<HTMLInputElement>()

    console.log('loading', props.loading)
    const onChangeHandler = (e: Event) => {
      props.onChange(e)
      if (inputFileRef.value) {
        inputFileRef.value.value = ''
      }
    }

    return () => (
      <Field>
        {() => {
          return (
            <div class="mx-auto w-40">
              <div class="relative h-40 w-40 overflow-hidden rounded-full border border-gray-300">
                {value.value && (
                  <div
                    style={{
                      '--bg-url': `url(${value.value.url})`
                    }}
                    class="h-full w-full rounded-full bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat"
                  ></div>
                )}
                {!value.value.url && (
                  <div class="lef-0 absolute top-0 flex h-40 w-40 items-center justify-center rounded-full">
                    <PhotoIcon class="h-8 w-8 text-gray-300" />
                  </div>
                )}
                {props.loading && (
                  <div class="absolute left-0 top-0 z-10 flex h-40 w-40 items-center justify-center rounded-full bg-black/80">
                    <ArrowPathIcon class="h-5 w-5 animate-spin text-white" />
                  </div>
                )}

                <input
                  ref={inputFileRef}
                  type="file"
                  disabled={props.loading || isSubmitting.value}
                  title="Change photo"
                  aria-label="Change photo"
                  onChange={onChangeHandler}
                  accept=".jpg, .jpeg, .png"
                  class="absolute left-0 top-0 h-full w-full cursor-pointer rounded-full opacity-0"
                />
              </div>
              <div class="mt-4 flex items-center justify-center">
                <button
                  type="button"
                  title="Remove current photo"
                  disabled={
                    !value.value.key || !value.value.url || props.loading || isSubmitting.value
                  }
                  class="flex items-center rounded-md border border-red-100 px-3 py-1 text-xs text-red-600  enabled:hover:bg-red-100 disabled:opacity-50"
                  onClick={props.onRemove}
                >
                  <TrashIcon class="mr-1 h-4 w-4" />
                  <span>Remove photo</span>
                </button>
              </div>
            </div>
          )
        }}
      </Field>
    )
  },
  name: 'Photo',
  props: {
    loading: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    onChange: {
      type: Function as PropType<(e: Event) => void>,
      required: true
    },
    onRemove: {
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
  },
  name: 'Name'
})

export const Breed = defineComponent({
  setup(props) {
    const { value, setValue } = useField<BreedType>('breed')
    const isSubmitting = useIsSubmitting()
    const query = ref('')

    const onChangeQuery = (e) => {
      query.value = e.target.value
    }

    const filteredBreeds = computed(() => {
      return query.value === ''
        ? props.breeds
        : props.breeds.filter((breed) =>
            breed.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.value.toLowerCase().replace(/\s+/g, ''))
          )
    })

    return () => (
      <Field label="Breed" errorMessage={<ErrorMessage name="breed" />}>
        {() => {
          return (
            <Combobox
              as="template"
              disabled={isSubmitting.value}
              name="breed"
              modelValue={value.value}
              onUpdate:modelValue={(breed: BreedType) => {
                setValue(breed)
              }}
            >
              <div class="relative">
                <div class="relative overflow-hidden rounded-lg border border-gray-300">
                  <ComboboxInput
                    class="h-12 w-full rounded-lg border-none pl-4 pr-8 disabled:bg-gray-100 disabled:opacity-70"
                    displayValue={(breed: BreedType) => breed.name}
                    onChange={onChangeQuery}
                  />
                  <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </ComboboxButton>
                </div>
                <TransitionRoot
                  as="template"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ComboboxOptions class="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredBreeds.value.map((breed) => (
                      <ComboboxOption value={breed} key={breed.id}>
                        {({ active }: { active: boolean }) => {
                          return (
                            <li
                              class={twMerge('relative py-4 pl-10 pr-4', active && 'bg-gray-100')}
                            >
                              <span
                                class={twMerge(
                                  'block truncate',
                                  value.value.id === breed.id && 'font-medium'
                                )}
                              >
                                {breed.name}
                              </span>
                              {value.value.id === breed.id ? (
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </li>
                          )
                        }}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
          )
        }}
      </Field>
    )
  },
  name: 'Breed',
  props: {
    breeds: {
      type: Object as PropType<BreedType[]>,
      required: true
    }
  }
})

export const Age = defineComponent({
  setup(props) {
    const { value, setValue } = useField<AgeType>('age')
    const isSubmitting = useIsSubmitting()

    return () => (
      <Field label="Age" errorMessage={<ErrorMessage name="age" />}>
        {() => {
          return (
            <Listbox
              as="template"
              disabled={isSubmitting.value}
              name="age"
              modelValue={value.value}
              onUpdate:modelValue={(age: AgeType) => {
                setValue(age)
              }}
            >
              <div class="relative">
                <ListboxButton
                  aria-label="Select the cat age"
                  class="relative h-12 w-full cursor-default rounded-md border border-gray-300 pl-4 pr-8 disabled:bg-gray-100 disabled:opacity-70"
                >
                  <span class="block truncate text-left">{value.value.name}</span>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <TransitionRoot
                  as="template"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {props.ages.map((age) => (
                      <ListboxOption key={age.id} value={age}>
                        {({ active }: { active: boolean }) => {
                          return (
                            <li
                              class={twMerge('relative py-4 pl-10 pr-4', active && 'bg-gray-100')}
                            >
                              <span
                                class={twMerge(
                                  'block truncate',
                                  value.value.id === age.id && 'font-medium'
                                )}
                              >
                                {age.name}
                              </span>
                              {value.value.id === age.id ? (
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-lime-600">
                                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </li>
                          )
                        }}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </TransitionRoot>
              </div>
            </Listbox>
          )
        }}
      </Field>
    )
  },
  name: 'Age',
  props: {
    ages: {
      type: Object as PropType<AgeType[]>,
      required: true
    }
  }
})

export const Description = defineComponent({
  setup(props) {
    const editorElement = ref<HTMLElement>()
    const toolbarOptions = [['bold', 'italic', 'underline']]
    onMounted(() => {
      if (editorElement.value) {
        const editor = new Quill(editorElement.value, {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions
          },
          placeholder: 'Describe your cat here.'
        })
      }
    })

    return () => (
      <Field label="Age">
        {() => {
          return (
            <div class="rounded-md overflow-hidden">
              <div ref={editorElement}>dsds</div>
            </div>
          )
        }}
      </Field>
    )
  },
  name: 'Description'
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
  },
  name: 'Submit'
})

export const Remove = defineComponent({
  setup(props) {
    return () => (
      <button
        title="Remove cat"
        type="button"
        disabled={props.disabled}
        onClick={props.onClick}
        class="flex items-center rounded-md px-7 py-3 text-red-600 enabled:hover:bg-red-100 disabled:opacity-70"
      >
        {props.loading && <ArrowPathIcon class="mr-2 h-4 w-4 animate-spin" />}
        Remove cat
      </button>
    )
  },
  name: 'Submit',
  props: {
    disabled: Boolean,
    loading: Boolean,
    onClick: Function as PropType<(e: Event) => void>
  }
})

export const ActionButtons = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="flex items-center gap-4"> {slots.default?.()}</div>
  },
  name: 'ActionButtons'
})

export function useCatForm() {
  return useForm<Values>({
    initialValues,
    validationSchema: Schema
  })
}
