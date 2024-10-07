import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { App } from './app'
import { HomePage } from '@/pages/home'
import { AddCatPage } from '@/pages/add-cat'
import { EditCatPage } from '@/pages/edit-cat'
import { SignInPage } from '@/pages/signin'
import { SignUpPage } from '@/pages/signup'
import { SignOutPage } from '@/pages/signout'
import { ProfilePage } from '@/pages/profile'

import { SessionGuard } from '@/containers/session-guard'

import './main.css'

const app = createApp(App)

app.use(
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        component: HomePage,
        children: [
          {
            path: '/cats/new',
            component: {
              render() {
                return (
                  <SessionGuard>
                    <AddCatPage />
                  </SessionGuard>
                )
              }
            }
          },
          {
            path: '/cats/:id/edit',
            component: {
              render() {
                return (
                  <SessionGuard>
                    <EditCatPage />
                  </SessionGuard>
                )
              }
            }
          },
          {
            path: '/signin',
            component: SignInPage
          },
          {
            path: '/signup',
            component: SignUpPage
          },
          {
            path: '/signout',
            component: SignOutPage
          },
          {
            path: '/profile',
            component: {
              render() {
                return (
                  <SessionGuard>
                    <ProfilePage />
                  </SessionGuard>
                )
              }
            }
          }
        ]
      }
    ]
  })
)
app.mount('#app')
