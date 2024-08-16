import axios from '@/axios'

export function useGetChartOfAccountCategoriesApi() {
  const send = async (search: string, page: number) => {
    try {
      const response = await axios.get('/v1/master/chart-of-account-categories', {
        params: {
          filter: {
            name: search
          },
          page: page,
          page_size: 100
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
