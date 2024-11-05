<script setup lang="ts">
import BranchAutocomplete from '@/pages/master/branches/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

interface ISelected {
  _id: string
  label: string
  code: string
  name: string
}

const branch = defineModel<ISelected>('branch')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Purchase Orders</template>

    <div class="flex flex-col gap-4 mt-5">
      <branch-autocomplete
        required
        layout="horizontal"
        label="Purchase Request"
        v-model:selected="branch"
        :errors="errors?.branch"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
