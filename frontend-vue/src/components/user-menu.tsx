import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { Popover, PopoverButton, PopoverPanel, TransitionRoot } from '@headlessui/vue'
import UserCircleIcon from '@heroicons/vue/24/solid/UserIcon'

import { useAuthentication } from '@/contexts/authentication-provider'

export const UserMenu = defineComponent({
  setup() {
    const auth = useAuthentication()

    return () => (
      <Popover class="relative">
        <PopoverButton
          // onClick={() => {}}
          class="rounded-full border border-white  p-2 text-white"
        >
          <UserCircleIcon class="h-6 w-6" />
        </PopoverButton>
        <TransitionRoot
          as="div"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel class="absolute right-0  z-10 mt-3 w-72 rounded-lg border border-gray-100 bg-white shadow-md">
            <div>
              <div>
                {auth?.value.authentication.UserAttributes && (
                  <div class="flex items-center px-4 py-5">
                    <UserCircleIcon class="mr-2 h-8 w-8 text-gray-600" />
                    <div>
                      <p class="text-sm font-semibold">
                        {auth.value.authentication.UserAttributes.name}
                      </p>
                      <p class="text-sm">{auth.value.authentication.UserAttributes.email}</p>
                    </div>
                  </div>
                )}
                <div>
                  {auth?.value.authentication.UserAttributes && (
                    <RouterLink
                      to="/profile"
                      class="block w-full px-4 py-3 text-left hover:bg-gray-100"
                    >
                      Editar perfil
                    </RouterLink>
                  )}
                  {auth?.value.authentication.UserAttributes && (
                    <RouterLink
                      to="/signout"
                      class="block w-full  px-4 py-3 text-left hover:bg-gray-100"
                    >
                      Sign out
                    </RouterLink>
                  )}

                  {!auth?.value.authentication.UserAttributes && (
                    <>
                      <RouterLink
                        to="/signin"
                        class="block w-full px-4 py-3 text-left hover:bg-gray-100"
                      >
                        Sign in
                      </RouterLink>
                      <RouterLink
                        to="/signup"
                        class="block w-full px-4 py-3 text-left hover:bg-gray-100"
                      >
                        Sign up
                      </RouterLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </PopoverPanel>
        </TransitionRoot>
      </Popover>
    )
  }
})
