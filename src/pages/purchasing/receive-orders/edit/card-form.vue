<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'

import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'
import type { ISelectedWarehouse } from '@/pages/master/warehouses/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const form_number = defineModel<string>('form_number', { required: true })
const purchase_order = defineModel<{ label: string }>('purchase_order')
const revised_count = defineModel<number>('revised_count')
const created_date = defineModel<string>('created_date', { required: true })
const required_date = defineModel<string>('required_date')
const branch = defineModel<ISelectedBranch>('branch', { required: true })
const warehouse = defineModel<ISelectedWarehouse>('warehouse', { required: true })
const warehouse_options = defineModel<ISelectedWarehouse[]>('warehouse_options')
const driver = defineModel<string>('driver')
const license_plate = defineModel<string>('license_plate')
const errors = defineModel<IFormError>('errors')

const computedCreatedDate = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'yyyy-MM-dd') : ''
})

const computedCreatedTime = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'HH:mm') : ''
})
</script>

<template>
  <base-card>
    <template #header>Receive Orders</template>

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
      <warehouse-autocomplete
        required
        layout="horizontal"
        label="Warehouse"
        v-model:options="warehouse_options"
        v-model:selected="warehouse"
        :errors="errors?.['warehouse._id']"
      />
      <base-input
        disabled
        v-model="required_date"
        label="Required Date"
        layout="horizontal"
        :errors="errors?.required_date"
      />
      <base-input
        v-if="purchase_order"
        layout="horizontal"
        label="Driver"
        v-model="driver"
        :errors="errors?.['driver']"
      />

      <base-input
        v-if="purchase_order"
        layout="horizontal"
        label="License Plate"
        v-model="license_plate"
        :errors="errors?.['license_plate']"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
