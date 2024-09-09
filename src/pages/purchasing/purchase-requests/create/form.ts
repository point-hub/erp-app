import { format } from 'date-fns/format'
import { ref } from 'vue'

interface IItem {
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
  required_date?: string
  branch?: IBranch
  items: IItem[]
  approval_to?: IApprovalTo
  notes?: string
}

export interface IFormError {
  branch: string[]
  required_date: string[]
  items: string[]
  approval_to: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    required_date: format(new Date(), 'dd-MM-yyyy'),
    items: []
  }

  const defaultFormError: IFormError = {
    branch: [],
    required_date: [],
    items: [],
    approval_to: [],
    notes: []
  }

  const data = ref<IForm>(defaultForm)

  const errors = ref<IFormError>(defaultFormError)

  // watch(
  //   () => {
  //     const array = []
  //     for (const key in data.value) {
  //       if (Object.prototype.hasOwnProperty.call(data.value, key)) {
  //         array.push(data.value[key])
  //       }
  //     }
  //     return array
  //   },
  //   (newValue, oldValue) => {
  //     for (let index = 0; index < newValue.length; index++) {
  //       if (newValue[index] !== oldValue[index]) {
  //         Object.keys(errors.value).forEach((key, i) => {
  //           if (index === i) {
  //             errors.value[key] = []
  //           }
  //         })
  //       }
  //     }
  //   }
  // )

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
