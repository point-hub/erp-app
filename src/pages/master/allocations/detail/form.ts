import { ref } from 'vue'

export interface IForm {
  [key: string]: any
  allocation_group: string
  code: string
  name: string
  notes: string
}

export function useForm() {
  const defaultForm: IForm = {
    allocation_group: '',
    code: '',
    name: '',
    notes: ''
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
