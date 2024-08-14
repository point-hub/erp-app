import { ref } from 'vue'

export interface IForm {
  [key: string]: any
  code: string
  name: string
  address: string
  phone: string
}

export function useForm() {
  const defaultForm: IForm = {
    code: '',
    name: '',
    address: '',
    phone: ''
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
