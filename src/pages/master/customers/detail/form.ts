import { ref } from 'vue'

export interface IForm {
  [key: string]: any
  customer_group_id: string
  code: string
  name: string
  address: string
  phone: string
  email: string
  notes: string
  bank_name: string
  bank_branch: string
  bank_account_name: string
  bank_account_number: string
}

export function useForm() {
  const defaultForm: IForm = {
    customer_group_id: '',
    code: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    notes: '',
    bank_name: '',
    bank_branch: '',
    bank_account_name: '',
    bank_account_number: ''
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
