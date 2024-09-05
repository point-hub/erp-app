import axios from '@/axios'

export function useCountersApi() {
  const getCode = async (name: string, code?: string) => {
    const filter: { name: string; code?: string } = {
      name: name
    }
    if (code) {
      filter.code = code
    }
    try {
      const response = await axios.get('/v1/counters', {
        params: {
          filter: filter
        }
      })

      if (response.status === 200) {
        return `${response.data.data[0].code}${(Number(response.data.data[0].count) + 1).toString().padStart(4, '0')}`
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { getCode }
}
