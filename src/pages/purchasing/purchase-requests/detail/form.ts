import { ref } from 'vue'

export interface IItem {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  notes: string
  quantity: number
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
  [key: string]: any
  rev?: number
  required_date?: string
  branch?: IBranch
  items: IItem[]
  approval_to?: IApprovalTo
  notes?: string
}

export function useForm() {
  const defaultForm: IForm = {
    form_number: '',
    rev: 0,
    required_date: '',
    branch: { _id: '', code: '', name: '', label: '' },
    created_by: { _id: '', username: '', name: '', email: '', label: '' },
    approval_to: { _id: '', username: '', name: '', email: '', label: '' },
    items: []
  }

  const data = ref<IForm>(defaultForm)

  return { data }
}
