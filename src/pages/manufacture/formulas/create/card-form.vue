<script setup lang="ts">
import { watch } from 'vue'

import { useCountersApi } from '@/api/counters.api'
import ProcessAutocomplete from '@/pages/manufacture/processes/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

interface ISelected {
  _id: string
  label: string
  code: string
  name: string
}

const countersApi = useCountersApi()
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const process = defineModel<ISelected>('process')
const errors = defineModel<IFormError>('errors')

watch(process, async () => {
  if (process.value?.code) {
    const selectedCode = await countersApi.getCode('formulas', process.value.code)
    if (selectedCode) code.value = selectedCode
  }
})
</script>

<template>
  <base-card>
    <template #header>Formulas</template>

    {{ process?.code }}

    <div class="flex flex-col gap-4 mt-5">
      <process-autocomplete
        required
        layout="horizontal"
        label="Process"
        v-model:selected="process"
        :errors="errors?.process"
      />
      <base-input v-model="code" label="Code" layout="horizontal" required />
      <base-input v-model="name" label="Name" layout="horizontal" required />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
