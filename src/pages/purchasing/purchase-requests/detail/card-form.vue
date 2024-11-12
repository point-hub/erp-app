<script setup lang="ts">
import { format } from 'date-fns/format'
import { computed } from 'vue'

const form_number = defineModel<string>('form_number', { required: true })
const revised_count = defineModel<number>('revised_count', { required: true })
const created_date = defineModel<string>('created_date', { required: true })
const required_date = defineModel<string>('required_date', { required: true })
const branch = defineModel<string>('branch', { required: true })

const computedCreatedDate = computed(() => {
  return created_date.value ? format(new Date(created_date.value), 'yyyy-MM-dd | HH:mm:ss') : ''
})
</script>

<template>
  <base-card>
    <template #header>Purchase Requests</template>

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
        label="Form Date"
        layout="horizontal"
        :modelValue="computedCreatedDate"
      />
      <base-input disabled label="Branch" layout="horizontal" :modelValue="branch" />
      <base-input
        disabled
        label="Required Date"
        layout="horizontal"
        description="When is this item needed to be used?"
        :modelValue="required_date"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
