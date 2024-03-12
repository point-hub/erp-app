import { AxiosError } from 'axios'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast-store'

const { toastRef } = useToastStore()

export function useRetrieveAllApi() {
  const send = async (query: any) => {
    console.log(query)
    try {
      const response = await axios.get(`/v1/accounting/chart-of-accounts`, {
        params: {
          page_size: query.page_size,
          page: query.page,
          sort: 'name',
          filter: {}
        }
      })
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        toastRef.toast(error.response?.data.message, { color: 'danger' })
      }
    }
  }

  return { send }
}
