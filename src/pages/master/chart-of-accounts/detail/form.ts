import { ref } from 'vue'

export interface IForm {
  [key: string]: any
  type: {
    name: string
  }
  category: {
    name: string
  }
  number: string
  name: string
  subledger: string
}

export function useForm() {
  const defaultForm: IForm = {
    type: {
      name: ''
    },
    category: {
      name: ''
    },
    number: '',
    name: '',
    subledger: ''
  }

  const data = ref<IForm>(defaultForm)

  const reset = () => {
    data.value = defaultForm
  }

  return { data, reset }
}
