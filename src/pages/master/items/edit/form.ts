import { ref, watch } from 'vue'

import type { ISelectedChartOfAccount } from '../../chart-of-accounts/components/autocomplete/autocomplete.vue'
import type { ISelectedItemCategory } from '../../item-categories/components/autocomplete/autocomplete.vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  category?: ISelectedItemCategory
  chart_of_account?: ISelectedChartOfAccount
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
