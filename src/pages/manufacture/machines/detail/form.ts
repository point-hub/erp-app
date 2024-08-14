import { ref } from 'vue'

export interface IForm {
  [key: string]: any
  code: string
  name: string
  notes: string
}

export function useForm() {
  const defaultForm: IForm = {
    code: '',
    name: '',
    notes: ''
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
