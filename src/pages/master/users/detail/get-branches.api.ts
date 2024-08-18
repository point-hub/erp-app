import axios from '@/axios'

export function useGetBranchesApi() {
  const send = async (search: string) => {
    try {
      const response = await axios.get('/v1/master/branches', {
        params: {
          filter: {
            label: search
          },
          page: 1,
          page_size: 9999
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
