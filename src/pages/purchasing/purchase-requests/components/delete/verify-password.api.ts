import { AxiosError } from 'axios'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import type { IFormError } from './form'

const { toastRef } = useToastStore()

export function useVerifyPasswordApi() {
  const send = async (password: string, errors: IFormError) => {
    try {
      const response = await axios.post(`/v1/purchase-requests/auth/verify-password`, {
        password: password
      })
      if (response.data.verified === false) {
        errors.password = ['Wrong Password']
        return
      }
      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        const listErrors: string[] = []
        const formErrors = error?.response?.data?.errors
        if (formErrors) {
          for (const key in formErrors) {
            errors[key] = formErrors[key]
            listErrors.push(formErrors[key])
          }
        }
        toastRef.toast(error.response?.data.message, {
          lists: listErrors.flat(),
          color: 'danger'
        })
      }
    }
  }

  return { send }
}
