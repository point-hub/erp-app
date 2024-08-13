import { ref, watch } from 'vue'

export interface IForm {
  [key: string]: any
  category: {
    code: string
    name: string
  }
  chart_of_account: {
    number: string
    name: string
  }
  code: string
  name: string
  unit: string
  have_production_number: boolean
  have_an_expiry_date: boolean
}

export interface IFormError {
  [key: string]: string[]
  category_id: string[]
  chart_of_account_id: string[]
  code: string[]
  name: string[]
  unit: string[]
  have_production_number: string[]
  have_an_expiry_date: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    category: {
      code: '',
      name: ''
    },
    chart_of_account: {
      number: '',
      name: ''
    },
    code: '',
    name: '',
    unit: '',
    have_production_number: false,
    have_an_expiry_date: false
  }

  const defaultFormError: IFormError = {
    category_id: [],
    chart_of_account_id: [],
    code: [],
    name: [],
    unit: [],
    have_production_number: [],
    have_an_expiry_date: []
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
