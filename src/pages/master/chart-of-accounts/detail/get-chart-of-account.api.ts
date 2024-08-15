import axios from '@/axios'

export function useGetChartOfAccountApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/chart-of-accounts/${_id}`)
      return {
        _id: response.data._id,
        type: response.data.type,
        category: response.data.category,
        number: response.data.number,
        name: response.data.name,
        subledger: response.data.subledger,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
