<script setup lang="ts">
import { ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const supplier_group_id = defineModel<string>('supplier_group_id')
const errors = defineModel<IFormError>('errors')
const supplierGroup = ref()

const selected = ref()
const options = ref([])

watch(supplier_group_id, () => {
  refetch()
})

const refetch = async () => {
  const response = await axios.get('/v1/supplier-groups', {
    params: {
      page: 1
    }
  })
  if (response.status === 200) {
    options.value = response.data.data.map((data: { _id: string; code: string; name: string }) => {
      if (data._id === supplier_group_id.value) {
        supplierGroup.value = `[${data.code}] ${data.name}`
      }
      return {
        id: data._id,
        label: `[${data.code}] ${data.name}`
      }
    })

    selected.value = options.value[0]
  }
}
</script>

<template>
  <base-card>
    <template #header>Suppliers</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="supplierGroup" label="Supplier Group" />
      <base-input disabled v-model="code" label="Code" :errors="errors?.code" />
      <base-input disabled v-model="name" label="Name" :errors="errors?.name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
