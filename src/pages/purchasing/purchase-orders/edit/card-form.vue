<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'

import { type ISelectedBranch } from '@/pages/master/branches/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const form_number = defineModel<string>('form_number', { required: true })
const required_down_payment = defineModel<boolean>('required_down_payment')
const purchase_request = defineModel<{ label: string }>('purchase_request')
const revised_count = defineModel<number>('revised_count')
const created_date = defineModel<string>('created_date', { required: true })
const required_date = defineModel<string>('required_date')
const branch = defineModel<ISelectedBranch>('branch', { required: true })
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
    <template #header>Purchase Orders</template>

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
        label="Purchase Request"
        layout="horizontal"
        :modelValue="purchase_request?.label"
      />
      <base-input disabled required label="Branch" layout="horizontal" :modelValue="branch.label" />
      <base-datepicker
        required
        v-model="required_date"
        label="Required Date"
        layout="horizontal"
        description="when the item is required to be shipped?"
        :errors="errors?.required_date"
      />
      <base-checkbox
        v-if="purchase_request"
        v-model="required_down_payment"
        label="Required Down Payment"
        layout="horizontal"
        description="is down payment required before shipment"
        :errors="errors?.required_down_payment"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
