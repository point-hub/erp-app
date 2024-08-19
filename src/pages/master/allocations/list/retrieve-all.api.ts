import axios from '@/axios'

interface ISearch {
  all: string
  code: string
  name: string
}

export function useGetAllocationsApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/master/allocations', {
        params: {
          filter: {
            search: search.all,
            code: search.code,
            name: search.name
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
