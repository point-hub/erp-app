import axios from '@/axios'

export function useGetItemApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/items/${_id}`)

      return {
        _id: response.data._id,
        chart_of_account: response.data.chart_of_account,
        category: response.data.category,
        code: response.data.code,
        name: response.data.name,
        unit: response.data.unit,
        have_production_number: response.data.have_production_number,
        have_an_expiry_date: response.data.have_an_expiry_date,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
