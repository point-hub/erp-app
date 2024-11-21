import { ref, watch } from 'vue'

import type { IApprovalTo, IBranch, IDetail, IPurchaseRequest, ISupplier } from '../interface'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  required_date?: string
  subtotal: number
  discount: number
  tax_base: number
  tax_type: 'include' | 'exclude' | 'non'
  tax: number
  total: number
  branch: IBranch
  supplier?: ISupplier
  purchase_request?: IPurchaseRequest
  details: IDetail[]
  approval_to?: IApprovalTo
  notes?: string
}

export interface IFormError {
  [key: string]: string[]
  required_date: string[]
  'branch._id': string[]
  details: string[]
  'approval_to._id': string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    subtotal: 0,
    discount: 0,
    tax_base: 0,
    tax_type: 'non',
    tax: 0,
    total: 0,
    branch: {
      _id: '',
      label: '',
      name: '',
      code: ''
    },
    details: []
  }

  const defaultFormError: IFormError = {
    required_date: [],
    'branch._id': [],
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
