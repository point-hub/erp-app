import { ref, watch } from 'vue'

export interface IForm {
  [key: string]: any
  type_id: string
  category_id: string
  number: number
  name: string
  subledger: string
}

export interface IFormError {
  [key: string]: string[]
  type_id: string[]
  category_id: string[]
  number: string[]
  name: string[]
  subledger: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    type_id: '',
    category_id: '',
    number: NaN,
    name: '',
    subledger: ''
  }

  const defaultFormError: IFormError = {
    type_id: [],
    category_id: [],
    number: [],
    name: [],
    subledger: []
  }

  const data = ref<IForm>(defaultForm)

  const errors = ref<IFormError>(defaultFormError)

  watch(
    () => {
      const array = []
      for (const key in data.value) {
        if (Object.prototype.hasOwnProperty.call(data.value, key)) {
          array.push(data.value[key])
        }
      }
      return array
    },
    (newValue, oldValue) => {
      for (let index = 0; index < newValue.length; index++) {
        if (newValue[index] !== oldValue[index]) {
          Object.keys(errors.value).forEach((key, i) => {
            if (index === i) {
              errors.value[key] = []
            }
          })
        }
      }
    }
  )

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
