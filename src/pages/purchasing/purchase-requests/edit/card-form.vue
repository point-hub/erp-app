<script setup lang="ts">
import BranchAutocomplete, {
  type ISelectedBranch
} from '@/pages/master/branches/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const required_date = defineModel<string>('required_date')
const options = defineModel<ISelectedBranch[]>('options')
const branch = defineModel<ISelectedBranch>('branch')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Purchase Requests</template>

    <div class="flex flex-col gap-4 mt-5">
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
