import { ref, watch } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  code: string
  name: string
  permission: { [key: string]: boolean | { [key: string]: boolean } }
  notes: string
}

export interface IFormError {
  [key: string]: string[]
  code: string[]
  name: string[]
  permission: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: '',
    name: '',
    permission: {},
    phone: '',
    notes: ''
  }

  const defaultFormError: IFormError = {
    code: [],
    name: [],
    permission: [],
    notes: []
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
