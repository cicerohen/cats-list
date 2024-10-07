import {
  defineComponent,
  type PropType,
  type SlotsType,
  type SetupContext,
  type CSSProperties,
  type DefineComponent
} from 'vue'
import { RouterLink } from 'vue-router'
import { type Descendant, createEditor } from 'slate'
import PhotoIcon from '@heroicons/vue/24/outline/PhotoIcon'
import { type Cat } from '@app/types'

export const CatCard = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => (
      <div class="group relative flex flex-col justify-between  overflow-hidden rounded-lg border border-gray-200  transition-all">
        {slots.default?.()}
      </div>
    )
  }
})

CatCard.Header = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="p-4">{slots.default?.()}</div>
  },
  name: 'Header'
})

CatCard.Footer = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="px-4 pb-4">{slots.default?.()}</div>
  },
  name: 'Footer'
})

CatCard.Name = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="text-xl">{slots.default?.()}</div>
  },
  name: 'Name'
})

CatCard.Breed = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="text-lg text-gray-600">{slots.default?.()}</div>
  },
  name: 'breed'
})

CatCard.Age = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="text-sm font-semibold text-gray-600">{slots.default?.()}</div>
  },
  name: 'Age'
})

CatCard.Description = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div class="text-sm font-semibold text-gray-600">{slots.default?.()}</div>
  },
  name: 'Description'
})

CatCard.Photo = defineComponent({
  setup(props) {
    return () => {
      return (
        <div
          style={
            {
              '--bg-url': `url(${props.url})`
            } as CSSProperties
          }
          class="
          relative mb-4 flex h-52 w-full items-center justify-center rounded-lg border  bg-[image:var(--bg-url)] bg-cover bg-center bg-no-repeat grayscale group-hover:grayscale-0"
        >
          {!props.url && <PhotoIcon class="h-8 w-8 text-gray-300" />}
        </div>
      )
    }
  },
  name: 'Photo',
  props: {
    url: {
      type: String,
      required: true
    }
  }
})

CatCard.Edit = ({ catId }: { catId: string }) => {
  return (
    <RouterLink
      to={`/cats/${catId}/edit`}
      class="inline-block rounded-md bg-green-700 px-5 py-2 text-sm font-medium text-white"
    >
      Edit
    </RouterLink>
  )
}

CatCard.Skeleton = () => {
  return (
    <div class="flex animate-pulse flex-col justify-between space-y-4 rounded-lg border p-4">
      <div class="space-y-2">
        <div class="mb-4 h-52 w-full animate-pulse rounded-lg bg-gray-200"></div>
        <div class="h-4 max-w-[100px] animate-pulse rounded-full bg-gray-200" />
        <div class="h-4 animate-pulse rounded-full  bg-gray-200" />
        <div class="h-4 animate-pulse rounded-full  bg-gray-200" />
      </div>
      <div class="h-10  w-20 animate-pulse rounded-lg bg-gray-200 px-3 py-2  text-white" />
    </div>
  )
}
