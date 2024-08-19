import { AxiosError } from 'axios'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import type { IForm, IFormError } from './form'

const { toastRef } = useToastStore()

export function useUpdateSupplierApi() {
  const send = async (_id: string, data: IForm, errors: IFormError) => {
    try {
      const response = await axios.patch(`/v1/master/suppliers/${_id}`, data)
      if (response.status === 200) {
        toastRef.toast('Update success', { color: 'success' })
        return {
          matched_count: response.data.matched_count,
          modified_count: response.data.modified_count
        }
      }
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
