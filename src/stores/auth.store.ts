import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IAuth {
  name?: string
  permission?: { [key: string]: boolean | { [key: string]: boolean } }
  default_branch?: string
  branches?: string[]
  default_warehouse?: string
  warehouses?: string[]
  project_id?: string
}

export const useAuthStore = defineStore('auth-store', () => {
  const name = ref()
  const permission = ref()
  const project_id = ref()
  const default_branch = ref()
  const default_warehouse = ref()
  const branches = ref()
  const warehouses = ref()

  const update = (auth: IAuth) => {
    if (auth.project_id) project_id.value = auth.project_id
    if (auth.name) name.value = auth.name
    if (auth.permission) permission.value = auth.permission
    if (auth.default_branch) default_branch.value = auth.default_branch
    if (auth.default_warehouse) default_warehouse.value = auth.default_warehouse
    if (auth.branches) branches.value = auth.branches
    if (auth.warehouses) warehouses.value = auth.warehouses
  }

  return {
    name,
    permission,
    default_branch,
    default_warehouse,
    branches,
    warehouses,
    project_id,
    update
  }
})
