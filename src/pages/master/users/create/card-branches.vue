<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import BranchAutocomplete from '@/pages/master/branches/components/autocomplete/branch-autocomplete.vue'

import type { IFormError } from './form'
import { useGetBranchesApi } from './get-branches.api'

const getBranchesApi = useGetBranchesApi()

const default_branch = defineModel<string>('default_branch')
const branches = defineModel<string[]>('branches', { default: [] })
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref<{ id: string; label: string; checked: boolean }[]>([])

onMounted(async () => {
  const response = await getBranchesApi.send('')
  if (response?.data) {
    options.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })

    for (const option of options.value) {
      if (default_branch.value === option.id) {
        option.checked = true
      }
    }

    selected.value = options.value[0]
  }
})

const onChecked = (option: { id: string; label: string; checked: boolean }) => {
  if (option.checked) {
    branches.value.push(option.id)
    return
  }

  // if option unchecked remove branch id from array
  const index = branches.value.findIndex((branch) => branch === option.id)
  if (index !== -1) {
    branches.value.splice(index, 1)

    if (option.id === default_branch.value) {
      default_branch.value = ''
      selected.value = { id: '', label: '', checked: false }
    }
  }
}

watch(default_branch, () => {
  if (!default_branch.value) return

  const index = branches.value.findIndex((branch) => default_branch.value === branch)
  if (index === -1 && default_branch.value) {
    branches.value.push(default_branch.value)
    for (const option of options.value) {
      if (option.id === default_branch.value) {
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

      {{ default_branch }}
      {{ branches }}

      <base-table class="max-h-100">
        <thead>
          <tr>
            <th class="w-0">Access</th>
            <th>Branches</th>
          </tr>
        </thead>
        <tbody v-if="branches">
          <tr v-for="option in options" :key="option.id">
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
