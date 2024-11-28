import { ref } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
