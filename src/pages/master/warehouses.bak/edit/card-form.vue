<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const branch_id = defineModel<string>('branch_id')
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref([])

watch(selected, () => {
  branch_id.value = selected.value.id ?? ''
})

watch(branch_id, () => {
  refetch()
})

const refetch = async () => {
  const response = await axios.get('/v1/master/branches', {
    params: {
      page: 1
    }
  })

  if (response.status === 200) {
    options.value = response.data.data.map((data: { _id: string; code: string; name: string }) => {
      if (branch_id.value === data._id) {
        selected.value = {
          id: data._id,
          label: `[${data.code}] ${data.name}`
        }
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })
  }
}

onMounted(async () => {})
</script>

<template>
  <base-card>
    <template #header>Warehouses</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-autocomplete
        required
        label="Branch"
        v-model="selected"
        :options="options"
        :errors="errors?.branch_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
