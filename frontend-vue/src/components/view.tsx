import {
  defineComponent,
  type SlotsType,
  type Ref,
  type SetupContext,
  inject,
  type ComponentOptions
} from 'vue'
import { RouterLink } from 'vue-router'
import PlusIcon from '@heroicons/vue/24/solid/PlusIcon'
import { UserMenu } from '@/components/user-menu'

const Body = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => (
      <div>
        <main class="min-h-[800px] p-8 lg:mx-auto lg:max-w-6xl">{slots.default?.()}</main>
      </div>
    )
  }
})

const Header = defineComponent(() => {
  return () => {
    return (
      <header class="sticky top-0 z-10 bg-green-700">
        <div class="flex h-20  items-center justify-between px-8 lg:mx-auto lg:max-w-6xl">
          <h1 class="font-semibold text-white">
            <RouterLink to="/">Cats List</RouterLink>
          </h1>
          <div class="flex space-x-2">
            <RouterLink
              to="/cats/new"
              class="flex items-center rounded-md border border-white px-3 py-2 text-white"
            >
              <PlusIcon class="h-6 w-6" />
              Add a cat
            </RouterLink>
            <UserMenu />
          </div>
        </div>
      </header>
    )
  }
})

export const View = defineComponent({
  setup(_, { slots }: SetupContext<{}, SlotsType<{ default?: () => any }>>) {
    return () => <div>{slots.default?.()}</div>
  }
})

View.Body = Body
View.Header = Header
