import axios from '@/axios'

export function useGetPermissionsApi() {
  const send = async () => {
    try {
      const response = await axios.get('/v1/master/permissions')

      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
