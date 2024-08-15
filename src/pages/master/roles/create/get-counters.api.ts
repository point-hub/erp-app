import axios from '@/axios'

export function useGetCountersApi() {
  const send = async (name: string) => {
    try {
      const response = await axios.get('/v1/counters', {
        params: {
          filter: {
            name: name
          }
        }
      })

      if (response.status === 200) {
        return {
          code: `${response.data.data[0].code}${(Number(response.data.data[0].count) + 1).toString().padStart(4, '0')}`
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
