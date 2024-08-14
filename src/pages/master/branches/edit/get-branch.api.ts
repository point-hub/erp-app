import axios from '@/axios'

export function useGetBranchApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/branches/${_id}`)

      return {
        _id: response.data._id,
        code: response.data.code,
        name: response.data.name,
        address: response.data.address,
        phone: response.data.phone,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
