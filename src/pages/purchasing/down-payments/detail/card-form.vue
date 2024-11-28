<script setup lang="ts">
import { format } from 'date-fns/format'
import { computed } from 'vue'

const form_number = defineModel<string>('form_number', { required: true })
const required_down_payment = defineModel<boolean>('required_down_payment')
const purchase_order = defineModel<{ label: string }>('purchase_order')
const required_date = defineModel<string>('required_date', { required: true, default: '' })
const revised_count = defineModel<number>('revised_count', { required: true })
const created_date = defineModel<string>('created_date', { required: true, default: '' })
const branch = defineModel<string>('branch', { required: true })

const computedCreatedDate = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'yyyy-MM-dd') : ''
})

const computedCreatedTime = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'HH:mm') : ''
})
</script>

<template>
  <base-card>
    <template #header>Down Payments</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled label="Form Number" layout="horizontal" :modelValue="form_number" />
      <base-input
        disabled
        v-if="revised_count > 0"
        label="Revision"
        layout="horizontal"
        :modelValue="revised_count"
      />
      <base-input
        disabled
        label="Created Date"
        layout="horizontal"
        :modelValue="computedCreatedDate"
      />
      <base-input
        disabled
        label="Created Time"
        layout="horizontal"
        :modelValue="computedCreatedTime"
      />
      <base-input
        disabled
        label="Purchase Order"
        layout="horizontal"
        :modelValue="purchase_order?.label"
      />
      <base-input disabled label="Required Date" layout="horizontal" :modelValue="required_date" />
      <base-input disabled label="Branch" layout="horizontal" :modelValue="branch" />

      <base-checkbox
        v-if="purchase_order"
        v-model="required_down_payment"
        label="Required Down Payment"
        layout="horizontal"
        description="is down payment required before shipment"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
