<script setup lang="ts">
const chart_of_account = defineModel<string>('chart_of_account')
</script>

<template>
  <base-card>
    <template #header>Chart of Account</template>
    <p>
      Select a journal account for this item, so that all journals that occur at the time of
      purchase, sale and others will be automatically journalized into the selected account.
    </p>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="chart_of_account" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
