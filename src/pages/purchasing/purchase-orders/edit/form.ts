import { ref, watch } from 'vue'

import type { IDetail } from '../interface'

interface IBranch {
  _id: string
  label: string
  code: string
  name: string
}

interface IApprovalTo {
  _id: string
  label: string
  name: string
  username: string
  email: string
}

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  form_number: string
  created_date: string
  branch: IBranch
  details: IDetail[]
  approval_to: IApprovalTo
  notes: string
}

export interface IFormError {
  [key: string]: string[]
  'branch._id': string[]
  details: string[]
  approval_to: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    form_number: '',
    created_date: '',
    branch: {
      _id: '',
      label: '',
      code: '',
      name: ''
    },
    details: [],
    approval_to: {
      _id: '',
      label: '',
      email: '',
      name: '',
      username: ''
    },
    notes: ''
  }

  const defaultFormError: IFormError = {
    'branch._id': [],
    details: [],
    approval_to: [],
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
    {
      deep: true
    }
  )

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
