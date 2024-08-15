import axios from '@/axios'

export function useGetRoleApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/roles/${_id}`)

      return {
        _id: response.data._id,
        code: response.data.code,
        name: response.data.name,
        permission: response.data.permission,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
