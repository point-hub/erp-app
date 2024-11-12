import { ref } from 'vue'

export interface IFormError {
  [key: string]: string[]
  reason: string[]
}

export function useForm() {
  const defaultFormError: IFormError = {
    reason: []
  }

  const errors = ref<IFormError>(defaultFormError)

  return { errors }
}
