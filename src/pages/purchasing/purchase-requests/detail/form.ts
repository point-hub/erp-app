import { ref } from 'vue'
import type { IReference } from '../interface'

export interface IDetail {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  notes: string
  quantity: number
  quantity_pending: number
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
  created_date: string
  required_date: string
  branch: IBranch
  details: IDetail[]
  approval_to: IApprovalTo
  approval_status?: string
  notes?: string
  references: IReference[]
}

export function useForm() {
  const defaultForm: IForm = {
    form_number: '',
    revised_count: 0,
    created_date: '',
    required_date: '',
    branch: { _id: '', code: '', name: '', label: '' },
    created_by: { _id: '', username: '', name: '', email: '', label: '' },
    approval_to: { _id: '', username: '', name: '', email: '', label: '' },
    details: [],
    references: []
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
