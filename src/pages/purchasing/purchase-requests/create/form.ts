import { ref, watch } from 'vue'

import type { IApprovalTo, IBranch, IDetail } from '../interface'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  required_date?: string
  branch?: IBranch
  details: IDetail[]
  approval_to?: IApprovalTo
  notes?: string
}

export interface IFormError {
  [key: string]: string[]
  'branch._id': string[]
  required_date: string[]
  details: string[]
  'approval_to._id': string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    required_date: '',
    details: []
  }

  const defaultFormError: IFormError = {
    'branch._id': [],
    required_date: [],
    details: [],
    'approval_to._id': [],
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
    },
    { deep: true }
  )

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
