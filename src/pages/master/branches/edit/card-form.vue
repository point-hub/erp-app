<script setup lang="ts">
import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Branches</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input required v-model="address" label="Address" :errors="errors?.address" />
      <base-input required v-model="phone" label="Phone" :errors="errors?.phone" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
