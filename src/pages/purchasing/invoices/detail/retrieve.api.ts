import { AxiosError } from 'axios'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

const { toastRef } = useToastStore()

export function useRetrievePurchaseInvoiceApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get('/v1/purchasing/invoices/' + _id)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const listErrors: string[] = []
        const formErrors = error?.response?.data?.errors
        if (formErrors) {
          for (const key in formErrors) {
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
