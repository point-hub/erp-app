<script setup lang="ts">
import type { IFormError } from './form'

const branch = defineModel<string>('branch')
const name = defineModel<string>('name')
const account_name = defineModel<string>('account_name')
const account_number = defineModel<string>('account_number')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Bank Info</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input v-model="name" label="Name" :errors="errors?.bank_name" />
      <base-input v-model="branch" label="Branch" :errors="errors?.bank_branch" />
      <base-input v-model="account_name" label="Account Name" :errors="errors?.bank_address" />
      <base-input
        v-model="account_number"
        label="Account Number"
        :errors="errors?.bank_account_number"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
