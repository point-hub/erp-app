import axios from '@/axios'

interface ISearch {
  all: string
  item: string
  unit: string
  warehouse: string
  date_start: string
  date_end: string
}

export function useGetMachinesApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/inventory/inventory-report', {
        params: {
          filter: {
            search: search.all,
            item: search.item,
            unit: search.unit,
            warehouse: search.warehouse,
            date_start: search.date_start,
            date_end: search.date_end
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
