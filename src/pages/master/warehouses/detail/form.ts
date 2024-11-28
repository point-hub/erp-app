import { ref } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  branch: string
  code: string
  name: string
  address: string
  phone: string
  notes: string
}

export function useForm() {
  const defaultForm: IForm = {
    branch: '',
    code: '',
    name: '',
    address: '',
    phone: '',
    notes: ''
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
