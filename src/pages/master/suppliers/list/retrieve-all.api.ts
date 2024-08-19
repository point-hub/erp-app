import axios from '@/axios'

interface ISearch {
  all: string
  code: string
  name: string
  address: string
  phone: string
  supplier_group: string
}

export function useGetSuppliersApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/master/suppliers', {
        params: {
          filter: {
            search: search.all,
            code: search.code,
            name: search.name,
            address: search.address,
            phone: search.phone,
            supplier_group: search.supplier_group
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
