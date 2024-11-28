import { ref, watch } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  role: string
  default_branch: string
  default_warehouse: string
  branches: string[]
  warehouses: string[]
  name: string
  username: string
  email: string
  password: string
}

export interface IFormError {
  [key: string]: string[]
  role: string[]
  default_branch: string[]
  default_warehouse: string[]
  branches: string[]
  warehouses: string[]
  name: string[]
  username: string[]
  email: string[]
  password: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    role: '',
    default_branch: '',
    default_warehouse: '',
    branches: [],
    warehouses: [],
    name: '',
    username: '',
    email: '',
    password: ''
  }

  const defaultFormError: IFormError = {
    role: [],
    default_branch: [],
    default_warehouse: [],
    branches: [],
    warehouses: [],
    name: [],
    username: [],
    email: [],
    password: []
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
