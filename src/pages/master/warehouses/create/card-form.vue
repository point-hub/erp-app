<script setup lang="ts">
import { ref } from 'vue'

import BranchAutocomplete from '@/pages/master/branches/components/autocomplete/branch-autocomplete.vue'

import type { IFormError } from './form'

const branch_id = defineModel<string>('branch_id')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const selectedBranch = ref()
</script>

<template>
  <base-card>
    <template #header>Warehouses</template>

    <div class="flex flex-col gap-4 mt-5">
      <branch-autocomplete
        required
        label="Branch"
        v-model="branch_id"
        v-model:selected="selectedBranch"
        :errors="errors?.branch_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="address" label="Address" :errors="errors?.address" />
      <base-input v-model="phone" label="Phone" :errors="errors?.phone" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
