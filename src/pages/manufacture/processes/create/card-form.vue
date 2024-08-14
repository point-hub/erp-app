<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')
const helpers = ref(['This code is used to generate item code based on the selected category'])

watch(code, () => {
  code.value = code.value?.toUpperCase() ?? ''
  if (code.value?.length > 4) {
    code.value = code.value.substring(0, 4)
    helpers.value[1] = `The code is too long. Max length is 4.`
  }
})
</script>

<template>
  <base-card>
    <template #header>Processes</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="code" label="Code" :errors="errors?.code" :helpers="helpers" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
