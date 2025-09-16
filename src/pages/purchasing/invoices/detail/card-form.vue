<script setup lang="ts">
import { format } from 'date-fns/format'
import { computed } from 'vue'

import type { ISelectedSupplier } from '@/pages/master/suppliers/components/autocomplete/autocomplete.vue'

const form_number = defineModel<string>('form_number', { required: true })
const supplier = defineModel<ISelectedSupplier>('supplier')
const revised_count = defineModel<number>('revised_count', { required: true })
const created_date = defineModel<string>('created_date', { required: true, default: '' })
const due_date = defineModel<string>('due_date', { required: true, default: '' })
const branch = defineModel<string>('branch', { required: true })

const computedCreatedDate = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'yyyy-MM-dd') : ''
})

const computedDueDate = computed(() => {
  return due_date.value ? format(new Date(due_date.value), 'yyyy-MM-dd') : ''
})

const computedCreatedTime = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'HH:mm') : ''
})
</script>

<template>
  <base-card>
    <template #header>Purchase Invoices</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled label="Form Number" layout="horizontal" :modelValue="form_number" />
      <base-input disabled v-if="revised_count > 0" label="Revision" layout="horizontal" :modelValue="revised_count" />
      <base-input v-if="supplier" disabled label="Supplier" layout="horizontal" :modelValue="supplier?.label" />
      <base-input class="print:hidden!" disabled label="Branch" layout="horizontal" :modelValue="branch" />
      <base-input disabled label="Due Date" layout="horizontal" :modelValue="computedDueDate" />
      <base-input class="print:hidden!" disabled label="Created Date" layout="horizontal"
        :modelValue="computedCreatedDate" />
      <base-input class="print:hidden!" disabled label="Created Time" layout="horizontal"
        :modelValue="computedCreatedTime" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
