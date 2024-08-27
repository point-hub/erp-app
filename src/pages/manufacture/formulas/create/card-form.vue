<script setup lang="ts">
import MachineAutocomplete from '@/pages/manufacture/machines/components/autocomplete/autocomplete.vue'
import ProcessAutocomplete from '@/pages/manufacture/processes/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

interface ISelected {
  _id: string
  label: string
  code: string
  name: string
}

const name = defineModel<string>('name')
const process = defineModel<ISelected>('process')
const machine = defineModel<ISelected>('machine')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Formulas</template>

    <div class="flex flex-col gap-4 mt-5">
      <process-autocomplete
        required
        layout="horizontal"
        label="Process"
        v-model:selected="process"
        :errors="errors?.process"
      />
      <machine-autocomplete
        required
        layout="horizontal"
        label="Machine"
        v-model:selected="machine"
        :errors="errors?.machine"
      />
      <base-input v-model="name" label="Name" layout="horizontal" required />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
