<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import BranchAutocomplete from '@/pages/master/branches/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'
import { useGetBranchesApi } from './get-branches.api'

const getBranchesApi = useGetBranchesApi()

const default_branch = defineModel<string>('default_branch', { default: {} })
const branches = defineModel<string[]>('branches', { default: [] })
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref<{ id: string; label: string; checked: boolean }[]>([])

onMounted(async () => {
  const response = await getBranchesApi.send('')
  if (response?.data) {
    options.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      const index = branches.value.findIndex((branch) => data._id === branch)
      let checked = false
      if (index !== -1) {
        checked = true
      }

      if (default_branch.value === data._id) {
        selected.value = {
          id: data._id,
          label: `[${data.code}] ${data.name}`
        }
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`,
        checked: checked
      }
    })
  }
})

watch(branches, () => {
  for (const option of options.value) {
    const index = branches.value.findIndex((branch) => option.id === branch)
    if (index !== -1) {
      option.checked = true
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
        disabled
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
          <tr v-for="option in options" :key="option.id">
            <td>
              <div class="flex items-center justify-center">
                <base-checkbox disabled v-model="option.checked" class="-mr-2" />
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
