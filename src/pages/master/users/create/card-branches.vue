<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import BranchAutocomplete from '@/pages/master/branches/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'
import { useGetBranchesApi } from './get-branches.api'

interface IOption {
  _id: string
  label: string
  code: string
  name: string
  checked: boolean
}

const getBranchesApi = useGetBranchesApi()

const default_branch = defineModel<string>('default_branch')
const branches = defineModel<string[]>('branches', { default: [] })
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref<[]>([])

onMounted(async () => {
  const response = await getBranchesApi.send('')
  if (response?.data) {
    options.value = response.data.map((data: IOption) => {
      return {
        _id: data._id,
        label: `[${data.code}] ${data.name}`,
        code: `${data.code}`,
        name: `${data.name}`
      }
    })

    for (const option of options.value) {
      if (default_branch.value === option._id) {
        option.checked = true
      }
    }
  }
})

const onChecked = (option: IOption) => {
  if (option.checked) {
    branches.value.push(option._id)
    return
  }

  // if option unchecked remove branch id from array
  const index = branches.value.findIndex((branch) => branch === option._id)
  if (index !== -1) {
    branches.value.splice(index, 1)

    if (option._id === default_branch.value) {
      default_branch.value = ''
      selected.value = { _id: '', label: '', checked: false }
    }
  }
}

watch(default_branch, () => {
  if (!default_branch.value) return

  const index = branches.value.findIndex((branch) => default_branch.value === branch)
  if (index === -1 && default_branch.value) {
    branches.value.push(default_branch.value)
    for (const option of options.value) {
      if (option._id === default_branch.value) {
        option.checked = true
      }
    }
  }
})
</script>

<template>
  <base-card>
    <template #header>Branch</template>

    <div class="flex flex-col gap-4 mt-5">
      <branch-autocomplete
        label="Default Branch"
        v-model="default_branch"
        v-model:selected="selected"
        :errors="errors?.default_branch"
      />

      <base-table class="max-h-100">
        <thead>
          <tr>
            <th class="w-0">Access</th>
            <th>Branches</th>
          </tr>
        </thead>
        <tbody v-if="branches">
          <tr v-for="option in options" :key="option._id">
            <td>
              <div class="flex items-center justify-center">
                <base-checkbox v-model="option.checked" @change="onChecked(option)" class="-mr-2" />
              </div>
            </td>
            <td>{{ option.label }}</td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
