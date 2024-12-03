<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'

import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import type { ISelectedSupplier } from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'

const form_number = defineModel<string>('form_number', { required: true })
const supplier = defineModel<ISelectedSupplier>('supplier')
const purchase_order = defineModel<{ label: string }>('purchase_order')
const revised_count = defineModel<number>('revised_count')
const created_date = defineModel<string>('created_date', { required: true })
const branch = defineModel<ISelectedBranch>('branch', { required: true })

const computedCreatedDate = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'yyyy-MM-dd') : ''
})

const computedCreatedTime = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'HH:mm') : ''
})
</script>

<template>
  <base-card>
    <template #header>Purchase Invoices</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled required label="Form Number" layout="horizontal" v-model="form_number" />
      <base-input disabled required label="Revision" layout="horizontal" v-model="revised_count" />
      <base-input
        disabled
        required
        label="Form Date"
        layout="horizontal"
        :modelValue="computedCreatedDate"
      />
      <base-input
        disabled
        required
        label="Form Date"
        layout="horizontal"
        :modelValue="computedCreatedTime"
      />
      <base-input
        disabled
        required
        label="Purchase Order"
        layout="horizontal"
        :modelValue="purchase_order?.label"
      />
      <base-input disabled required label="Branch" layout="horizontal" :modelValue="branch.label" />
      <base-input
        v-if="supplier"
        required
        disabled
        layout="horizontal"
        label="Supplier"
        :modelValue="supplier.label"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
