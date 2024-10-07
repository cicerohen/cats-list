import { defineComponent, ref, watch, type SlotsType, type SetupContext, provide } from 'vue'

import { AuthenticationProvider } from '@/contexts/authentication-provider'
import { CatsProvider } from '@/contexts/cats-provider'
import { ToasterProvider, Toaster } from '@/components/toaster'
export const App = defineComponent({
  setup() {
    return () => (
      <AuthenticationProvider>
        <CatsProvider>
          <ToasterProvider>
            <router-view></router-view>
            <Toaster />
          </ToasterProvider>
        </CatsProvider>
      </AuthenticationProvider>
    )
  }
})
