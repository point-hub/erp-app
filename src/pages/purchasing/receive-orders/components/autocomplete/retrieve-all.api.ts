import axios from '@/axios'

export function useGetWarehousesApi() {
  const send = async (search: string, page: number) => {
    try {
      const response = await axios.get('/v1/purchasing/receive-orders', {
        params: {
          filter: {
            label: search,
            is_finished: false,
            is_revised: false,
            is_deleted: false,
            required_down_payment: true,
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
