import axios from '@/axios'

interface ISearch {
  all: string
  code: string
  name: string
  address: string
  phone: string
}

export function useGetWarehousesApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/purchasing/receive-orders', {
        params: {
          filter: {
            search: search.all,
            code: search.code,
            name: search.name,
            address: search.address,
            phone: search.phone
          },
          sort: '-form_number',
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
