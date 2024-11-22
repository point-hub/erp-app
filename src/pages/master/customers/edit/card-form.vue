<script setup lang="ts">
import CustomerGroupAutocomplete, {
  type ISelectedCustomerGroup
} from '@/pages/master/customer-groups/components/autocomplete/autocomplete.vue'

import type { IFormError } from './form'

const customer_group = defineModel<ISelectedCustomerGroup>('customer_group')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const email = defineModel<string>('email')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Customers</template>

    <div class="flex flex-col gap-4 mt-5">
      <customer-group-autocomplete
        required
        label="Customer Group"
        v-model:selected="customer_group"
        :errors="errors?.['customer_group._id']"
      />

      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-input v-model="address" label="Address" :errors="errors?.address" />
      <base-input v-model="phone" label="Phone" :errors="errors?.phone" />
      <base-input type="email" v-model="email" label="Email" :errors="errors?.email" />
      <base-textarea v-model="notes" label="Notes" :errors="errors?.notes" :minHeight="128" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
