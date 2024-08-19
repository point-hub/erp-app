import axios from '@/axios'

export function useGetAllocationApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/allocations/${_id}`)

      return {
        _id: response.data._id,
        allocation_group: response.data.allocation_group,
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
