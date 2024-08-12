<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import axios from '@/axios'

import type { IFormError } from './form'

const chart_of_account_id = defineModel<string>('chart_of_account_id')
const errors = defineModel<IFormError>('errors')

const selected = ref()
const options = ref([])

watch(selected, () => {
  chart_of_account_id.value = selected.value.id ?? ''
})

onMounted(async () => {
  const response = await axios.get('/v1/chart-of-accounts', {
    params: {
      page: 1
    }
  })
  if (response.status === 200) {
    options.value = response.data.data.map(
      (data: { _id: string; number: string; name: string }) => {
        return {
          id: data._id,
          label: `[${data.number}] ${data.name}`
        }
      }
    )

    selected.value = options.value[0]
  }
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
      <base-autocomplete
        required
        v-model="selected"
        :options="options"
        :errors="errors?.chart_of_account_id"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
