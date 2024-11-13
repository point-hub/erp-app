import { AxiosError } from 'axios'

import axios from '@/axios'
import { useToastStore } from '@/stores/toast.store'

const { toastRef } = useToastStore()

export function useApproveApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.post(`/v1/purchasing/purchase-requests/${_id}/approve`)
      if (response.status === 200) {
        return response
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toastRef.toast(error.response?.data.message, {
          color: 'danger'
        })
      }
    }
  }

  return { send }
}
