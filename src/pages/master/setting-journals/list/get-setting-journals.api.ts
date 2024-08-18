import axios from '@/axios'

interface ISearch {
  all: string
  module: string
  feature: string
}

export function useGetSettingJournalsApi() {
  const send = async (search?: ISearch | undefined, page = 1) => {
    try {
      const response = await axios.get('/v1/master/setting-journals', {
        params: {
          filter: {
            search: search?.all,
            module: search?.module,
            feature: search?.feature
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
