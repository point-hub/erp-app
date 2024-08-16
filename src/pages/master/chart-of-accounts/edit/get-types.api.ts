import axios from '@/axios'

export function useGetChartOfAccountTypesApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/chart-of-account-types/${_id}`)
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
