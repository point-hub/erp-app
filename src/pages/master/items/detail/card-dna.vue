<script setup lang="ts">
import { onMounted } from 'vue'

import type { IFormError } from './form'

const have_production_number = defineModel<boolean>('have_production_number')
const have_an_expiry_date = defineModel<boolean>('have_an_expiry_date')
const errors = defineModel<IFormError>('errors')

onMounted(async () => {})
</script>

<template>
  <base-card>
    <template #header>DNA</template>
    <p>
      DNA stock is useful for making it easier to tracking the production code or item expiration
      date, check the options below if the item has a production code and expiration date. This
      option is permanent and cannot be changed.
    </p>
    <div class="flex flex-col gap-4 mt-5">
      <base-checkbox
        label="Production Number"
        v-model="have_production_number"
        layout="horizontal"
        description="Check this option if you want to track production number in this item"
        :errors="errors?.have_production_number"
      />
      <base-checkbox
        label="Expiry Date"
        v-model="have_an_expiry_date"
        layout="horizontal"
        description="Check this option if you want to track expiry date in this item"
        :errors="errors?.have_an_expiry_date"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
