import axios from '@/axios'

export function useGetCustomerApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/master/customers/${_id}`)

      return {
        _id: response.data._id,
        customer_group: response.data.customer_group,
        code: response.data.code,
        name: response.data.name,
        address: response.data.address,
        phone: response.data.phone,
        email: response.data.email,
        bank_name: response.data.bank_name,
        bank_branch: response.data.bank_branch,
        bank_account_name: response.data.bank_account_name,
        bank_account_number: response.data.bank_account_number,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
