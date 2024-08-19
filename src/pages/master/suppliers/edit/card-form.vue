<script setup lang="ts">
import { ref, watch } from 'vue'

import SupplierGroupAutocomplete from '@/pages/master/supplier-groups/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const supplier_group_id = defineModel<string>('supplier_group_id')
const supplier_group = defineModel<{ _id: string; code: string; name: string }>('supplier_group')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const email = defineModel<string>('email')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const selectedSupplierGroup = ref<{ id: string; label: string; code: string }>({
  id: '',
  label: '',
  code: ''
})

watch(supplier_group, () => {
  selectedSupplierGroup.value = {
    id: `${supplier_group.value?._id}`,
    label: `[${supplier_group.value?.code}] ${supplier_group.value?.name}`,
    code: `${supplier_group.value?.code}`
  }
})
</script>

<template>
  <base-card>
    <template #header>Suppliers</template>

    <div class="flex flex-col gap-4 mt-5">
      <supplier-group-autocomplete
        required
        label="Supplier Group"
        v-model="supplier_group_id"
        v-model:selected="selectedSupplierGroup"
        :errors="errors?.supplier_group_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="address" label="Address" :errors="errors?.address" />
      <base-input v-model="phone" label="Phone" :errors="errors?.phone" />
      <base-input type="email" v-model="email" label="Email" :errors="errors?.email" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
