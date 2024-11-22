import { ref } from 'vue'

import type { TaxType } from '../interface'

export interface IDetail {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  quantity: number
  price: number
  discount: number
  total: number
  allocation: {
    _id: string
    label: string
    code: string
    name: string
  }
}

export interface IBranch {
  _id: string
  label: string
  code: string
  name: string
}

export interface IApprovalTo {
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
  revised_count: number
  branch: IBranch
  details: IDetail[]
  subtotal: number
  discount: number
  tax_base: number
  tax_type: TaxType
  tax: number
  total: number
  approval_to: IApprovalTo
  approval_status?: string
  notes?: string
}

export function useForm() {
  const defaultForm: IForm = {
    form_number: '',
    revised_count: 0,
    branch: { _id: '', code: '', name: '', label: '' },
    created_by: { _id: '', username: '', name: '', email: '', label: '' },
    approval_to: { _id: '', username: '', name: '', email: '', label: '' },
    details: [],
    subtotal: 0,
    discount: 0,
    tax_base: 0,
    tax_type: 'non',
    tax: 0,
    total: 0
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
