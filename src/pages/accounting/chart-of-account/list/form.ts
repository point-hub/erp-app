import { ref } from 'vue'

interface IForm {
  number: string
  name: string
  type: string
  subledger: string
  errors: {
    [key: string]: string[]
    number: string[]
    name: string[]
    type: string[]
    subledger: string[]
  }
}

export function useForm() {
  const data = ref<IForm>({
    number: '',
    name: '',
    type: '',
    subledger: '',
    errors: {
      number: [],
      name: [],
      type: [],
      subledger: []
    }
  })

  const reset = () => {
    data.value = {
      number: '',
      name: '',
      type: '',
      subledger: '',
      errors: {
        number: [],
        name: [],
        type: [],
        subledger: []
      }
    }
  }

  return { data, reset }
}
