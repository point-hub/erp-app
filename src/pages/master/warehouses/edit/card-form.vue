<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import type { IFormError } from './form'
import { useGetBranchesApi } from './get-branches.api'

const branch_id = defineModel<string>('branch_id')
const branch = defineModel<{ _id: string; code: string; name: string }>('branch')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const getBranchesApi = useGetBranchesApi()
const selectedBranch = ref<{ id: string; label: string }>({ id: '', label: '' })
const optionsBranch = ref<{ id: string; label: string }[]>([])

watch(selectedBranch, () => {
  branch_id.value = selectedBranch.value.id
})

watch(branch, () => {
  selectedBranch.value = {
    id: branch.value?._id ?? '',
    label: `[${branch.value?.code}] ${branch.value?.name}`
  }
})

onMounted(async () => {
  const response = await getBranchesApi.send({ label: '' }, 1)
  if (response?.data) {
    optionsBranch.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })
  }
})

const searchBranch = ref('')
const isLoadingBranchOptions = ref<boolean>(false)

watch(searchBranch, () => {
  // start loading without debounced for smooth ux
  isLoadingBranchOptions.value = true
})

watchDebounced(
  searchBranch,
  async (newVal) => {
    // call api
    const response = await getBranchesApi.send({ all: newVal }, 1)
    if (response?.data) {
      optionsBranch.value = response.data.map(
        (data: { _id: string; code: string; name: string }) => {
          return {
            id: data._id,
            label: `[${data.code}] ${data.name}`
          }
        }
      )
    }
    // finish loading
    isLoadingBranchOptions.value = false
  },
  { debounce: 500, maxWait: 1000 }
)
</script>

<template>
  <base-card>
    <template #header>Warehouses</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Branch"
        v-model:is-loading="isLoadingBranchOptions"
        v-model="selectedBranch"
        v-model:query="searchBranch"
        :options="optionsBranch"
        :errors="errors?.branch_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="address" label="Address" :errors="errors?.address" />
      <base-input v-model="phone" label="Phone" :errors="errors?.phone" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
