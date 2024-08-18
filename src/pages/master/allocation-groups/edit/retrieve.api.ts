import axios from '@/axios'

export function useGetAllocationGroupApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/allocation-groups/${_id}`)

      return {
        _id: response.data._id,
        code: response.data.code,
        name: response.data.name,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
