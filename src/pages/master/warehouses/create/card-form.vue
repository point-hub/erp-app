<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { IFormError } from './form'
import { type ISearch, useGetBranchesApi } from './get-branches.api'

const branch_id = defineModel<string>('branch_id')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const getBranchesApi = useGetBranchesApi()
const selectedBranch = ref()
const optionsBranch = ref([])

watch(selectedBranch, () => {
  branch_id.value = selectedBranch.value.id ?? ''
})

const search: ISearch = {
  all: ''
}

onMounted(async () => {
  const response = await getBranchesApi.send(search, 1)
  if (response?.data) {
    optionsBranch.value = response.data.map((data: { _id: string; code: string; name: string }) => {
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })

    selectedBranch.value = optionsBranch.value[0]
  }
})
</script>

<template>
  <base-card>
    <template #header>Warehouses</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Branch"
        v-model="selectedBranch"
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
