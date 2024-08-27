import { ref, watch } from 'vue'

interface IItem {
  item: {
    _id: string
    label: string
    code: string
    name: string
    unit: string
  }
  quantity: number
}

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
  [key: string]: any
  name?: string
  process?: IBranch
  finished_goods?: IItem[]
  raw_materials?: IItem[]
  approval_to?: IApprovalTo
  notes?: string
}

export interface IFormError {
  [key: string]: string[]
  name: string[]
  process: string[]
  finished_goods: string[]
  raw_materials: string[]
  approval_to: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: '',
    finished_goods: [],
    raw_materials: [],
    notes: ''
  }

  const defaultFormError: IFormError = {
    name: [],
    process: [],
    finished_goods: [],
    raw_materials: [],
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
    }
  )

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
