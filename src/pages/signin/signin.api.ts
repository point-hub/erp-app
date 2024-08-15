import { AxiosError } from 'axios'

import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'

const { toastRef } = useToastStore()

export function useSigninApi() {
  const send = async (data: any, errors: any) => {
    try {
      const authStore = useAuthStore()
      const response = await axios.post('/v1/master/auth/signin', {
        username: data.username,
        password: data.password,
        remember_me: data.rememberMe
      })

      authStore.update({
        name: response.data.name,
        permission: response.data.role.permission
      })

      toastRef.toast('Signin success', { color: 'success' })
      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        const formErrors = error?.response?.data?.errors
        if (formErrors) {
          for (const key in formErrors) {
            errors[key] = formErrors[key]
          }
        } else {
          toastRef.toast(error.response?.data.message, { color: 'danger' })
        }
      }
    }
  }

  return { send }
}
