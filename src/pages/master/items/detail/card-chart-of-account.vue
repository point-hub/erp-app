<script setup lang="ts">
import { ref, watch } from 'vue'

const chart_of_account = defineModel<{
  number: number
  name: string
}>('chart_of_account')
const name = ref()

watch(chart_of_account, () => {
  name.value = `[${chart_of_account.value?.number}] ${chart_of_account.value?.name}`
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
      <base-input disabled v-model="name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
