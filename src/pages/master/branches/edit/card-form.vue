<script setup lang="ts">
import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Branches</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input
        disabled
        v-model="code"
        label="Code"
        :errors="errors?.code"
        :helpers="['code is not editable']"
      />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="address" label="Address" :errors="errors?.address" />
      <base-input v-model="phone" label="Phone" :errors="errors?.phone" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
