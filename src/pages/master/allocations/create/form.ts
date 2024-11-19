import { ref, watch } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  allocation_group: {
    _id: string
    label: string
  }
  code: string
  name: string
  notes: string
}

export interface IFormError {
  [key: string]: string[]
  'allocation_group._id': string[]
  'allocation_group.label': string[]
  code: string[]
  name: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    allocation_group: {
      _id: '',
      label: ''
    },
    code: '',
    name: '',
    notes: ''
  }

  const defaultFormError: IFormError = {
    'allocation_group._id': [],
    'allocation_group.label': [],
    code: [],
    name: [],
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
