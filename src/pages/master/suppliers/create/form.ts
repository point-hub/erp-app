import { ref, watch } from 'vue'

export interface IForm {
  [key: string]: any
  supplier_group?: {
    _id: string
    label: string
    code: string
    name: string
  }
  code: string
  name: string
  address: string
  phone: string
  email: string
  notes: string
  bank_name: string
  bank_branch: string
  bank_account_name: string
  bank_account_number: string
}

export interface IFormError {
  [key: string]: string[]
  'supplier_group._id': string[]
  code: string[]
  name: string[]
  address: string[]
  phone: string[]
  email: string[]
  notes: string[]
  bank_name: string[]
  bank_branch: string[]
  bank_account_name: string[]
  bank_account_number: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    notes: '',
    bank_name: '',
    bank_branch: '',
    bank_account_name: '',
    bank_account_number: ''
  }

  const defaultFormError: IFormError = {
    'supplier_group._id': [],
    code: [],
    name: [],
    address: [],
    phone: [],
    email: [],
    notes: [],
    bank_name: [],
    bank_branch: [],
    bank_account_name: [],
    bank_account_number: []
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
