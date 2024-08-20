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
      const response = await axios.get('/v1/purchasing/purchase-orders', {
        params: {
          filter: {
            search: search.all,
            code: search.code,
            name: search.name,
            address: search.address,
            phone: search.phone
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
