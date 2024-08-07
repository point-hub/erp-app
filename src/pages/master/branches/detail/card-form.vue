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
      <base-input disabled v-model="code" label="Code" :errors="errors?.code" />
      <base-input disabled v-model="name" label="Name" :errors="errors?.name" />
      <base-input disabled v-model="address" label="Address" :errors="errors?.address" />
      <base-input disabled v-model="phone" label="Phone" :errors="errors?.phone" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
