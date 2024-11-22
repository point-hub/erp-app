import { AxiosError } from 'axios'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

import type { IForm, IFormError } from './form'

const { toastRef } = useToastStore()

export function useCreateFormulaApi() {
   
  const send = async (data: IForm, errors: IFormError) => {
    try {
      const response = await axios.post('/v1/manufacture/formulas', data)
      if (response.status === 201) {
        toastRef.toast('Create success', { color: 'success' })
        return {
          inserted_id: response.data.inserted_id
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
