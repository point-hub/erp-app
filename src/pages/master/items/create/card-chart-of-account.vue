<script setup lang="ts">
import { ref, watch } from 'vue'

import ChartOfAccountAutocomplete from '@/pages/master/chart-of-accounts/components/autocomplete/chart-of-account-autocomplete.vue'

import type { IFormError } from './form'

const chart_of_account_id = defineModel<string>('chart_of_account_id')
const errors = defineModel<IFormError>('errors')

const selected = ref()

watch(selected, () => {
  chart_of_account_id.value = selected.value.id ?? ''
})
</script>

<template>
  <base-card>
    <template #header>Chart of Account</template>
    <p>
      Select a journal account for this item, so that all journals that occur at the time of
      purchase, sale and others will be automatically journalized into the selected account.
    </p>

    <div class="flex flex-col gap-4 mt-5">
      <chart-of-account-autocomplete
        required
        v-model="chart_of_account_id"
        v-model:selected="selected"
        subledger="Item"
        :errors="errors?.chart_of_account_id"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
