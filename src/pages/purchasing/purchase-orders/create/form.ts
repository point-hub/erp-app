import { ref, watch } from 'vue'

import type { IDetail } from '@/pages/purchasing/purchase-orders/interface'

import type { IApprovalTo, IBranch, IPurchaseRequest, ISupplier, TaxType } from '../interface'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  branch?: IBranch
  purchase_request?: IPurchaseRequest
  supplier?: ISupplier
  required_date?: string
  required_down_payment?: boolean
  details?: IDetail[]
  subtotal?: number
  discount?: number
  tax_base?: number
  tax_type?: TaxType
  tax?: number
  total?: number
  approval_to?: IApprovalTo
  notes?: string
}

export interface IFormError {
  [key: string]: string[]
  'branch._id': string[]
  'purchase_request._id': string[]
  'supplier._id': string[]
  required_date: string[]
  'details.item._id': string[]
  'details.quantity': string[]
  'details.price': string[]
  subtotal: string[]
  discount: string[]
  tax_base: string[]
  tax_type: string[]
  tax: string[]
  total: string[]
  'approval_to._id': string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    details: []
  }

  const defaultFormError: IFormError = {
    'branch._id': [],
    'purchase_request._id': [],
    'supplier._id': [],
    required_date: [],
    'details.item._id': [],
    'details.quantity': [],
    'details.price': [],
    subtotal: [],
    discount: [],
    tax_base: [],
    tax_type: [],
    tax: [],
    total: [],
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
