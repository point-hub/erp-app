<script setup lang="ts">
import { ref, watch } from 'vue'

import { useCountersApi } from '@/api/counters.api'
import AllocationGroupAutocomplete from '@/pages/master/allocation-groups/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const allocation_group_id = defineModel<string>('allocation_group_id')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const selected = ref()
const countersApi = useCountersApi()

watch(selected, async () => {
  const selectedCode = await countersApi.getCode('allocation_groups', selected.value.code)
  if (selectedCode) code.value = selectedCode
})
</script>

<template>
  <base-card>
    <template #header>Allocations</template>

    <div class="flex flex-col gap-4 mt-5">
      <allocation-group-autocomplete
        required
        label="Allocation Group"
        v-model="allocation_group_id"
        v-model:selected="selected"
        :errors="errors?.allocation_group_id"
      />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
