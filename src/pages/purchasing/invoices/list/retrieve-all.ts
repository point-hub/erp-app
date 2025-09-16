import axios from '@/axios'

interface ISearch {
  all: string
  start_date: string
  end_date: string
  approval_status: string
  form_status: string
}

export function useGetWarehousesApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/purchasing/invoices', {
        params: {
          filter: {
            search: search.all,
            start_date: search.start_date,
            end_date: search.end_date,
            approval_status: search.approval_status,
            form_status: search.form_status
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
