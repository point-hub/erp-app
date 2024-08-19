<script setup lang="ts">
const branch = defineModel<string>('branch')
const name = defineModel<string>('name')
const account_name = defineModel<string>('account_name')
const account_number = defineModel<string>('account_number')
</script>

<template>
  <base-card>
    <template #header>Bank Info</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input v-model="name" label="Name" />
      <base-input v-model="branch" label="Branch" />
      <base-input v-model="account_name" label="Account Name" />
      <base-input v-model="account_number" label="Account Number" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
