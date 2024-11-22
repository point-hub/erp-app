<script setup lang="ts">
import AllocationGroupAutocomplete, {
  type ISelectedAllocationGroup
} from '@/pages/master/allocation-groups/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const allocation_group_id = defineModel<string>('allocation_group_id')
const allocation_group = defineModel<ISelectedAllocationGroup>('allocation_group')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Allocations</template>

    <div class="flex flex-col gap-4 mt-5">
      <allocation-group-autocomplete
        required
        label="Allocation Group"
        v-model="allocation_group_id"
        v-model:selected="allocation_group"
        :errors="errors?.['allocation_group._id']"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
