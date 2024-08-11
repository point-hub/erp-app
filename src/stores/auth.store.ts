import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IAuth {
  name?: string
  permission?: { [key: string]: any }
  projectId?: string
}

export const useAuthStore = defineStore('auth-store', () => {
  const name = ref()
  const permission = ref()
  const projectId = ref()

  const update = (auth: IAuth) => {
    if (auth.name) name.value = auth.name
    if (auth.permission) permission.value = auth.permission
    if (auth.projectId) projectId.value = auth.projectId
  }

  return { name, permission, projectId, update }
})
