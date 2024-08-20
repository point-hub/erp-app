import axios from '@/axios'

export function useGetRolesApi() {
  const send = async (search: string, page: number) => {
    try {
      const response = await axios.get('/v1/master/roles', {
        params: {
          filter: {
            label: search
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
