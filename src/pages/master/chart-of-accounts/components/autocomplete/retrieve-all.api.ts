import axios from '@/axios'

export function useGetChartOfAccountsApi() {
  const send = async (filter: { [key: string]: string }, page = 1) => {
    try {
      const response = await axios.get('/v1/master/chart-of-accounts', {
        params: {
          filter: filter,
          page: page,
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
