<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'

import BranchAutocomplete, {
  type ISelectedBranch
} from '@/pages/master/branches/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const form_number = defineModel<string>('form_number', { required: true })
const revised_count = defineModel<number>('revised_count', { required: true })
const created_date = defineModel<string>('created_date', { required: true })
const required_date = defineModel<string>('required_date', { required: true })
const options = defineModel<ISelectedBranch[]>('options', { required: true })
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
    <template #header>Purchase Requests</template>

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
      <branch-autocomplete
        required
        layout="horizontal"
        label="Branch"
        v-model:selected="branch"
        v-model:options="options"
        :errors="errors?.['branch._id']"
      />
      <base-datepicker
        required
        v-model="required_date"
        label="Required Date"
        layout="horizontal"
        description="When is this item needed to be used?"
        :errors="errors?.required_date"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
