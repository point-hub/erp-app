import axios from '@/axios'

interface IFields {
  is_finished?: boolean
  is_revised?: boolean
  is_deleted?: boolean
  has_invoice?: boolean
  required_down_payment?: boolean
}

export function useGetWarehousesApi() {
  const send = async (
    search: string,
    page: number,
    fields: IFields = {
      is_finished: false,
      is_revised: false,
      is_deleted: false,
      has_invoice: false
    }
  ) => {
    try {
      const response = await axios.get('/v1/purchasing/purchase-orders', {
        params: {
          filter: {
            label: search,
            is_finished: fields.is_finished,
            has_invoice: fields.has_invoice,
            is_revised: false,
            is_deleted: false,
            required_down_payment: fields.required_down_payment,
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
