import axios from '@/axios'

export function useGetWarehousesApi() {
  const send = async (search: string, page: number, required_down_payment: boolean) => {
    try {
      const response = await axios.get('/v1/purchasing/purchase-orders', {
        params: {
          filter: {
            label: search,
            is_finished: false,
            is_revised: false,
            is_deleted: false,
            required_down_payment: required_down_payment,
            approval_status: 'approved'
          },
          page: page
        }
      })

      return {
        data: response.data.data,
        pagination: response.data.pagination
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
