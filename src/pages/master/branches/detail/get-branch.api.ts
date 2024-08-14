import axios from '@/axios'

export function useGetBranchApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/branches/${_id}`)

      return {
        _id: response.data._id,
        code: response.data.code,
        name: response.data.name,
        address: response.data.address,
        phone: response.data.phone
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
