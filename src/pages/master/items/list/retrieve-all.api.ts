import axios from '@/axios'

interface ISearch {
  all: string
  label: string
  chart_of_account: string
  category: string
  code: string
  name: string
  unit: string
  have_production_number: boolean | null
  have_an_expiry_date: boolean | null
}

export function useGetItemsApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/master/items', {
        params: {
          filter: {
            search: search.all,
            label: search.label,
            category: search.category,
            chart_of_account: search.chart_of_account,
            code: search.code,
            name: search.name,
            unit: search.unit,
            have_production_number: search.have_production_number,
            have_an_expiry_date: search.have_an_expiry_date
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
